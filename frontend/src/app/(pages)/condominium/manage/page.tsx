'use client';

import { useState, useRef, useEffect } from 'react';
import Sortable from 'sortablejs';
import { PlusIcon, TrashIcon, HomeIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import createAxiosInstance from '@/helpers/global/services/axios/axios.instance';
import { useRouter } from 'next/navigation';

type Lote = {
  id: string;
  nome: string;
};

type Rua = {
  id: string;
  nome: string;
  lotes: Lote[];
};

export default function DesignerLayoutCondominio() {
  const [ruas, setRuas] = useState<Rua[]>([]);
  const [ruaSelecionadaId, setRuaSelecionadaId] = useState<string | null>(null);
  const [quantidadeLotes, setQuantidadeLotes] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [loteAtual, setLoteAtual] = useState<Lote | null>(null);
  const [nomeLote, setNomeLote] = useState('');
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusDialog, setStatusDialog] = useState<'success' | 'error' | null>(null);
  const router = useRouter();

  const condominiumId = localStorage.getItem('condominiumId');

  const axios = createAxiosInstance();

  // Estado para contar o total de lotes
  const [totalLotes, setTotalLotes] = useState(0);

  useEffect(() => {
    if (layoutRef.current) {
      new Sortable(layoutRef.current, {
        animation: 150,
        ghostClass: 'bg-yellow-100',
        handle: '.rua-handle',
      });
    }
  }, []);

  const closeModalRedirect = () => {
    localStorage.removeItem('condominiumId');
    router.push("/condominium");
  };

  useEffect(() => {
    ruas.forEach((rua) => {
      const el = document.getElementById(`rua-${rua.id}`);
      if (el) {
        new Sortable(el, {
          animation: 150,
          ghostClass: 'bg-yellow-100',
          group: 'lotes',
          handle: '.lote-handle',
        });
      }
    });
    // Atualiza a contagem total de lotes
    const total = ruas.reduce((acc, rua) => acc + rua.lotes.length, 0);
    setTotalLotes(total);
  }, [ruas]);

  const adicionarRua = () => {
    const novaRua: Rua = {
      id: Date.now().toString(),
      nome: `Rua ${ruas.length + 1}`,
      lotes: []
    };
    setRuas([...ruas, novaRua]);
    setRuaSelecionadaId(novaRua.id);
  };

  const excluirRua = (ruaId: string) => {
    setRuas(ruas.filter(rua => rua.id !== ruaId));
    if (ruaSelecionadaId === ruaId) {
      setRuaSelecionadaId(null);
    }
  };

  const adicionarLotes = (ruaId: string) => {
    setRuas(ruas.map(rua => {
      if (rua.id === ruaId) {
        const novosLotes = Array.from({ length: quantidadeLotes }, (_, i) => ({
          id: `${totalLotes + i + 1}`, // Use o total de lotes para o ID
          nome: `Lote vivenda ${totalLotes + i + 1}` // Use o total de lotes para o nome
        }));
        return { ...rua, lotes: [...rua.lotes, ...novosLotes] };
      }
      return rua;
    }));
  };

  const excluirLote = (ruaId: string, loteId: string) => {
    setRuas(ruas.map(rua => {
      if (rua.id === ruaId) {
        return { ...rua, lotes: rua.lotes.filter(lote => lote.id !== loteId) };
      }
      return rua;
    }));
  };

  const salvarLote = () => {
    if (loteAtual) {
      setRuas(ruas.map(rua => ({
        ...rua,
        lotes: rua.lotes.map(lote => 
          lote.id === loteAtual.id ? { ...lote, nome: nomeLote } : lote
        )
      })));
    }
    setModalAberto(false);
  };

  const abrirModalLote = (lote: Lote) => {
    setLoteAtual(lote);
    setNomeLote(lote.nome);
    setModalAberto(true);
  };

  const salvarLayout = async () => {
    if (!condominiumId) return; // Evita executar se `id` não estiver disponível
    setIsLoading(true);
    try {
      const ruaPromises = ruas.map(async (rua) => {
        const response = await axios.post('/streets', {
          name: rua.nome,
          condominiumId: Number(condominiumId),
        });
        const ruaCriada = response.data;

        const lotePromises = rua.lotes.map(async (lote, index) => {
          await axios.post('/lots', {
            lot_number: index + 1,
            street_id: ruaCriada.id,
            status: 'Available',
            description: lote.nome,
          });
        });
        await Promise.all(lotePromises);
      });
      await Promise.all(ruaPromises);

      setStatusDialog('success');
    } catch (erro) {
      setStatusDialog('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-trasparent min-h-screen p-0 md:p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center text-gray-800"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
            <Card className="w-full md:w-1/4 mb-4 md:mb-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">Ferramentas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={adicionarRua} className="w-full">
                  <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Rua
                </Button>
                <div className="items-center space-x-0">
                  <Input
                    type="number"
                    min="1"
                    value={quantidadeLotes}
                    onChange={(e) => setQuantidadeLotes(parseInt(e.target.value) || 1)}
                    className="w-full rounded-b-none"
                  />
                  <Button onClick={() => ruaSelecionadaId && adicionarLotes(ruaSelecionadaId)} className="w-full pt-3 rounded-t-none">
                    <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Lotes
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">Loteamento</h2>
                </div>
                <div></div>
                <div>
                  <Button onClick={salvarLayout} disabled={isLoading} className="w-full py-3">
                    {isLoading ? 'Carregando...' : 'Salvar loteamento'}
                  </Button>
                </div>
              </div>
              
              <div ref={layoutRef} className="space-y-4 border-2 border-dashed border-gray-300 p-6 min-h-[600px] rounded-xl bg-gray-50">
                {ruas.map(rua => (
                  <Card
                    key={rua.id}
                    className={`${ruaSelecionadaId === rua.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setRuaSelecionadaId(rua.id)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between rua-handle cursor-move">
                      <Input
                        value={rua.nome}
                        onChange={(e) => setRuas(ruas.map(r => r.id === rua.id ? { ...r, nome: e.target.value } : r))}
                        className="text-xl font-semibold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                      />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => adicionarLotes(rua.id)}>
                          <PlusIcon className="h-4 w-4 mr-2" /> Lotes
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => excluirRua(rua.id)}>
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div id={`rua-${rua.id}`} className="flex flex-wrap gap-3">
                        {rua.lotes.map(lote => (
                          <div key={lote.id} className="group relative">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => abrirModalLote(lote)}
                              className="flex items-center space-x-2 lote-handle cursor-move"
                            >
                              <HomeIcon className="h-4 w-4" />
                              <span>{lote.nome}</span>
                            </Button>
                            <button
                              onClick={() => excluirLote(rua.id, lote.id)}
                              className="absolute top-0 right-0 hidden group-hover:block text-red-500"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Editar Lote</DialogTitle>
          </DialogHeader>
          <Input value={nomeLote} onChange={(e) => setNomeLote(e.target.value)} />
          <DialogFooter>
            <Button onClick={salvarLote}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={statusDialog !== null} onOpenChange={() => setStatusDialog(null)}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>{statusDialog === 'success' ? 'Sucesso' : 'Erro'}</DialogTitle>
          </DialogHeader>
          <p>
            {statusDialog === 'success'
              ? 'Loteamento salvo com sucesso!'
              : 'Ocorreu um erro ao salvar loteamento.'}
          </p>
          <DialogFooter>
            <Button onClick={() => statusDialog === 'success' ? closeModalRedirect() : setStatusDialog(null)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import Sortable from 'sortablejs'
// import { PlusIcon, TrashIcon, HomeIcon } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import createAxiosInstance from '@/helpers/global/services/axios/axios.instance'
// import { useRouter } from 'next/navigation';

// type Lote = {
//   id: string
//   nome: string
// }

// type Rua = {
//   id: string
//   nome: string
//   lotes: Lote[]
// }

// export default function DesignerLayoutCondominio() {
//   const [ruas, setRuas] = useState<Rua[]>([])
//   const [ruaSelecionadaId, setRuaSelecionadaId] = useState<string | null>(null)
//   const [quantidadeLotes, setQuantidadeLotes] = useState(1)
//   const [modalAberto, setModalAberto] = useState(false)
//   const [loteAtual, setLoteAtual] = useState<Lote | null>(null)
//   const [nomeLote, setNomeLote] = useState('')
//   const layoutRef = useRef<HTMLDivElement>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [statusDialog, setStatusDialog] = useState<'success' | 'error' | null>(null)
//   const router = useRouter();

//   const condominiumId = localStorage.getItem('condominiumId'); 

//   const axios = createAxiosInstance()

//   useEffect(() => {
//     if (layoutRef.current) {
//       new Sortable(layoutRef.current, {
//         animation: 150,
//         ghostClass: 'bg-yellow-100',
//         handle: '.rua-handle',
//       })
//     }
//   }, [])

//   const closeModalRedirect = () => {
//     localStorage.removeItem('condominiumId');
//     router.push("/condominium");
//   }

//   useEffect(() => {
//     ruas.forEach((rua) => {
//       const el = document.getElementById(`rua-${rua.id}`)
//       if (el) {
//         new Sortable(el, {
//           animation: 150,
//           ghostClass: 'bg-yellow-100',
//           group: 'lotes',
//           handle: '.lote-handle',
//         })
//       }
//     })
//   }, [ruas])

//   const adicionarRua = () => {
//     const novaRua: Rua = {
//       id: Date.now().toString(),
//       nome: `Rua ${ruas.length + 1}`,
//       lotes: []
//     }
//     setRuas([...ruas, novaRua])
//     setRuaSelecionadaId(novaRua.id)
//   }

//   const excluirRua = (ruaId: string) => {
//     setRuas(ruas.filter(rua => rua.id !== ruaId))
//     if (ruaSelecionadaId === ruaId) {
//       setRuaSelecionadaId(null)
//     }
//   }

//   const adicionarLotes = (ruaId: string) => {
//     setRuas(ruas.map(rua => {
//       if (rua.id === ruaId) {
//         const novosLotes = Array.from({ length: quantidadeLotes }, (_, i) => ({
//           id: `${rua.id}-${rua.lotes.length + i + 1}`,
//           nome: `Lote vivenda ${rua.lotes.length + i + 1}`
//         }))
//         return { ...rua, lotes: [...rua.lotes, ...novosLotes] }
//       }
//       return rua
//     }))
//   }

//   const excluirLote = (ruaId: string, loteId: string) => {
//     setRuas(ruas.map(rua => {
//       if (rua.id === ruaId) {
//         return { ...rua, lotes: rua.lotes.filter(lote => lote.id !== loteId) }
//       }
//       return rua
//     }))
//   }

//   const salvarLote = () => {
//     if (loteAtual) {
//       setRuas(ruas.map(rua => ({
//         ...rua,
//         lotes: rua.lotes.map(lote => 
//           lote.id === loteAtual.id ? { ...lote, nome: nomeLote } : lote
//         )
//       })))
//     }
//     setModalAberto(false)
//   }

//   const abrirModalLote = (lote: Lote) => {
//     setLoteAtual(lote)
//     setNomeLote(lote.nome)
//     setModalAberto(true)
//   }

//   const salvarLayout = async () => {
//     if (!condominiumId) return // Evita executar se `id` não estiver disponível
//     setIsLoading(true)
//     try {
//       const ruaPromises = ruas.map(async (rua) => {
//         const response = await axios.post('/streets', {
//           name: rua.nome,
//           condominiumId: Number(condominiumId),
//         })
//         const ruaCriada = response.data

//         const lotePromises = rua.lotes.map(async (lote, index) => {
//           await axios.post('/lots', {
//             lot_number: index + 1,
//             street_id: ruaCriada.id,
//             status: 'Available',
//             description: lote.nome,
//           })
//         })
//         await Promise.all(lotePromises)
//       })
//       await Promise.all(ruaPromises)

//       setStatusDialog('success')
//     } catch (erro) {
//       setStatusDialog('error')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="bg-trasparent min-h-screen p-0 md:p-8">
//       <Card className="max-w-6xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-3xl md:text-4xl font-bold text-center text-gray-800"></CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
//             <Card className="w-full md:w-1/4 mb-4 md:mb-0">
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold text-gray-700">Ferramentas</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Button onClick={adicionarRua} className="w-full">
//                   <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Rua
//                 </Button>
//                 <div className="items-center space-x-0">
//                   <Input
//                     type="number"
//                     min="1"
//                     value={quantidadeLotes}
//                     onChange={(e) => setQuantidadeLotes(parseInt(e.target.value) || 1)}
//                     className="w-full rounded-b-none"
//                   />
//                   <Button onClick={() => ruaSelecionadaId && adicionarLotes(ruaSelecionadaId)} className="w-full pt-3 rounded-t-none">
//                     <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Lotes
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//             <div className="w-full md:w-3/4">
//               <div className="grid grid-cols-3 gap-2">
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-4 text-gray-700">Loteamento</h2>
//                 </div>
//                 <div></div>
//                 <div>
//                   <Button onClick={salvarLayout} disabled={isLoading} className="w-full py-3">
//                     {isLoading ? 'Carregando...' : 'Salvar loteamento'}
//                   </Button>
//                 </div>
//               </div>
              
//               <div ref={layoutRef} className="space-y-4 border-2 border-dashed border-gray-300 p-6 min-h-[600px] rounded-xl bg-gray-50">
//                 {ruas.map(rua => (
//                   <Card
//                     key={rua.id}
//                     className={`${ruaSelecionadaId === rua.id ? 'ring-2 ring-blue-500' : ''}`}
//                     onClick={() => setRuaSelecionadaId(rua.id)}
//                   >
//                     <CardHeader className="flex flex-row items-center justify-between rua-handle cursor-move">
//                       <Input
//                         value={rua.nome}
//                         onChange={(e) => setRuas(ruas.map(r => r.id === rua.id ? { ...r, nome: e.target.value } : r))}
//                         className="text-xl font-semibold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
//                       />
//                       <div className="flex space-x-2">
//                         <Button variant="outline" size="sm" onClick={() => adicionarLotes(rua.id)}>
//                           <PlusIcon className="h-4 w-4 mr-2" /> Lotes
//                         </Button>
//                         <Button variant="destructive" size="sm" onClick={() => excluirRua(rua.id)}>
//                           <TrashIcon className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div id={`rua-${rua.id}`} className="flex flex-wrap gap-3">
//                         {rua.lotes.map(lote => (
//                           <div key={lote.id} className="group relative">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => abrirModalLote(lote)}
//                               className="flex items-center space-x-2 lote-handle cursor-move"
//                             >
//                               <HomeIcon className="h-4 w-4" />
//                               <span>{lote.nome}</span>
//                             </Button>
//                             <button
//                               onClick={() => excluirLote(rua.id, lote.id)}
//                               className="absolute top-0 right-0 hidden group-hover:block text-red-500"
//                             >
//                               <TrashIcon className="h-4 w-4" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Dialog open={modalAberto} onOpenChange={setModalAberto}>
//         <DialogContent className='bg-white'>
//           <DialogHeader>
//             <DialogTitle>Editar Lote</DialogTitle>
//           </DialogHeader>
//           <Input value={nomeLote} onChange={(e) => setNomeLote(e.target.value)} />
//           <DialogFooter>
//             <Button onClick={salvarLote}>Salvar</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={statusDialog !== null} onOpenChange={() => setStatusDialog(null)}>
//         <DialogContent className="bg-white">
//           <DialogHeader>
//             <DialogTitle>{statusDialog === 'success' ? 'Sucesso' : 'Erro'}</DialogTitle>
//           </DialogHeader>
//           <p>
//             {statusDialog === 'success'
//               ? 'Loteamento salvo com sucesso!'
//               : 'Ocorreu um erro ao salvar loteamento.'}
//           </p>
//           <DialogFooter>
//             {statusDialog === 'success' 
//               ? ( <Button onClick={() => closeModalRedirect()}>Fechar</Button> ) 
//               : ( <Button onClick={() => setStatusDialog(null)}>Fechar</Button> ) }
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }