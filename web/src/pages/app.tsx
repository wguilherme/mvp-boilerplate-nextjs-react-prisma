import { signOut, useSession } from "next-auth/react";

export default function App() {


  const { data } = useSession();
  return (
    <div >

      <h1>Minha conta</h1>
      <p>Bem-vindo, {data.user.name}</p>
      <p>Email: {data.user.email}</p>
      <img src={data.user.image} width="100" style={{ borderRadius: '50%' }} />
      {/* {JSON.stringify(data, null, 2)} */}
      <button className="mt-10" onClick={() => signOut(
        {
          callbackUrl: "/",
          redirect: true

        }
      )}>Sair da conta</button>
    </div>
  )
}