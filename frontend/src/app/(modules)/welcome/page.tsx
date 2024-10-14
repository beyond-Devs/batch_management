import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResponsiveContainer } from "recharts";
import MyBarChart from "@/helpers/single/welcome/components/chart/myBarChart";
import bgImage from "@/assets/midea/resources/backgrounds/fundo-min.png";

const Page = () => {
  return (
    <>
      <div
        className="h-40 w-full bg-cover bg-center rounded-t-lg flex justify-start items-center"
        style={{
          backgroundImage: `url(${bgImage.src})`
        }}
      >
        <div className="p-10 h-auto" style={{ fontFamily: 'CustomFont' }}>
          <div className="text-white text-2xl font-black font-sans">Bem-vindo ao Sysconp</div>
          <div className="text-white font-medium font-sans text-sm mt-1">Administrador</div>
        </div>
      </div>
      <div className="space-y-6 mt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="dark:border-none dark:bg-dark-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Kz 45.231,89</div>
              <p className="text-xs text-muted-foreground">+20,1% em relação ao mês passado</p>
            </CardContent>
          </Card>
          <Card className="dark:border-none dark:bg-dark-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assinaturas</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2.350</div>
              <p className="text-xs text-muted-foreground">+180,1% em relação ao mês passado</p>
            </CardContent>
          </Card>
          <Card className="dark:border-none dark:bg-dark-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.234</div>
              <p className="text-xs text-muted-foreground">+19% em relação ao mês passado</p>
            </CardContent>
          </Card>
          <Card className="dark:border-none dark:bg-dark-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ativos Agora</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 desde a última hora</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 dark:border-none dark:bg-dark-primary">
            <CardHeader>
              <CardTitle>Visão Geral</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {/* <ResponsiveContainer width="100%" height={350}>
                <MyBarChart />
              </ResponsiveContainer> */}
            </CardContent>
          </Card>
          <Card className="col-span-3 dark:border-none dark:bg-dark-primary">
            <CardHeader>
              <CardTitle>Vendas Recentes</CardTitle>
              <CardContent>
                <div className="space-y-8 pt-3">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Olivia Martin</p>
                      <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+Kz 1.999,00</div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                      <AvatarImage src="/avatars/02.png" alt="Avatar" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Jackson Lee</p>
                      <p className="text-sm text-muted-foreground">
                        jackson.lee@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+Kz 39,00</div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/03.png" alt="Avatar" />
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                      <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+Kz 299,00</div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/04.png" alt="Avatar" />
                      <AvatarFallback>WK</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">William Kim</p>
                      <p className="text-sm text-muted-foreground">will@email.com</p>
                    </div>
                    <div className="ml-auto font-medium">+Kz 99,00</div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/05.png" alt="Avatar" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Sofia Davis</p>
                      <p className="text-sm text-muted-foreground">
                        sofia.davis@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+Kz 39,00</div>
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
