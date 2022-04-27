import { Task } from "@prisma/client";
import { GetServerSideProps } from "next";
import { signOut, useSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

type TasksProps = {
  tasks: Task[]
}

export default function App({ tasks }: TasksProps) {


  const { data } = useSession();
  return (
    <div >

      <div>

        <h1>Minha conta</h1>
        <p>Bem-vindo, {data?.user?.name}</p>
        <p>Email: {data?.user?.email}</p>
        <img src={data?.user?.image} width="100" style={{ borderRadius: '50%' }} />
        {/* {JSON.stringify(data, null, 2)} */}
        <button className="mt-10" onClick={() => signOut(
          {
            redirect: true,
            callbackUrl: '/',
          }
        )}>Sair da conta</button>
      </div>

      <div>
        <h2>Minhas tarefas</h2>
        {/* task list using tailwind */}
        <div className="flex flex-wrap -space-y-px">
          {tasks?.map(task => (
            <div className="w-full sm:w-1/2 p-3">
              <div className="bg-white shadow-lg rounded-lg">
                <div className="p-4">
                  <h3 className="text-xl font-bold">{task?.title}</h3>
                  <h5>{task?.isDone}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks: any = await prisma.task.findMany()

  const data = tasks.map(task => {
    return {
      id: task.id,
      title: task.title,
      isDone: task.isDone,
      date: task.createdAt.toISOString()
    }
  })



  console.log(tasks)
  return {
    props: {
      tasks: data
    }
  }
}