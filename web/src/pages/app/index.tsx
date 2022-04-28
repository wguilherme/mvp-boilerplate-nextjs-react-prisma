import { Task } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from "react";
import { prisma } from "../../lib/prisma";


type TasksProps = {
  tasks: Task[]
}

export default function App({ tasks }: TasksProps) {
  const { data } = useSession();
  const router = useRouter();
  const [taskList, setTaskList] = useState<any>(tasks);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    email: "",
  })

  useEffect(() => {
    setNewTask({
      ...newTask,
      email: data?.user?.email
    })
  }, [data])

  const refreshData = () => {
    router.replace(router.asPath);
  }



  async function handleCreateTask(event: FormEvent) {
    try {
      event.preventDefault();

      const taskData = {
        ...newTask,
        email: data?.user?.email
      }

      await fetch('http://localhost:3000/api/tasks/create', {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const newTaskList: any = [...taskList, taskData];
      setTaskList(newTaskList);


    } catch (error) {
      console.log('ocorreu um erro', error)
    }
    finally {
      refreshData();
    }
  }


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

      {/* for for create tasks using tailwind */}
      <div>
        <h1>Minhas tarefas</h1>
        <form onSubmit={handleCreateTask}>
          <input type="text" name="title" placeholder="Título" onChange={e => setNewTask({
            ...newTask,
            title: e.target.value
          })} />
          <input type="text" name="description" placeholder="Descrição" onChange={e => setNewTask({
            ...newTask,
            description: e.target.value
          })} />
          <button type="submit">Criar tarefa</button>
        </form>
        {JSON.stringify(taskList.length)}
      </div>
      <div>
        <h2>Minhas tarefas</h2>
        {/* task list using tailwind */}
        <div className="flex flex-wrap -space-y-px">
          {taskList?.map((task: any) => (
            <div key={task.id} className="w-full sm:w-1/2 p-3">
              <div className="bg-white shadow-lg rounded-lg">
                <div className="p-4">
                  <h3 className="text-xl font-bold">{task?.title}</h3>
                  <h3 className="text-xl font-light">{task?.description}</h3>
                  <h5>Completed: {task?.isDone}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session = await getSession({ req });
  // console.log('session debug props', session?.user?.email)

  const tasks: any = await prisma.task.findMany({
    where: {
      email: session?.user?.email
    }
  })

  const data = tasks.map(task => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isDone: task.isDone === true ? 'yes' : 'no',
      date: task.createdAt.toISOString()
    }
  })



  return {
    props: {
      tasks: data
    }
  }
}