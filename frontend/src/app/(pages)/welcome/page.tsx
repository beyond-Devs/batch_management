// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import SignOutDialog from "@/helpers/global/layouts/navigation/components/sign-out.component";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { LogOutIcon } from "lucide-react";

// const Page = () => {
//   return (
//     <>
//       <div>
//         <Dialog>
//           <DialogTrigger className="flex gap-1 py-1 items-center cursor-pointer px-3 text-sm w-full rounded-sm bg-red-200 dark:bg-red-800">
//             <LogOutIcon className="w-5 h-5" />
//             <div className="w-max flex">Sair</div>
//           </DialogTrigger>
//           <DialogContent className="bg-white">
//             <SignOutDialog />
//           </DialogContent>
//         </Dialog>
//       </div>
//     </>
//   );
// };

// export default Page;
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.full_name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

