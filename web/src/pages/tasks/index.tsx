import { NewTask, TaskItem, TaskList } from "@/components";
import { Task } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from "react";
import { prisma } from "../../lib/prisma";

type TasksProps = { tasks: Task[] }

export default function App({ tasks }: TasksProps) {
  const { data } = useSession();
  const router = useRouter();
  const [taskList, setTaskList] = useState<any>(tasks);
  const [newTask, setNewTask] = useState({ title: "", description: "", email: "" })

  useEffect(() => { setNewTask({ ...newTask, email: data?.user?.email }) }, [data])

  const refreshData = () => { router.replace(router.asPath) }

  async function handleCreateTask(event: FormEvent) {
    try {
      event.preventDefault();
      const taskData = { ...newTask, email: data?.user?.email }

      await fetch('http://localhost:3000/api/tasks/create', {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: { 'Content-Type': 'application/json' }
      })

      const newTaskList: any = [...taskList, taskData];
      setTaskList(newTaskList);
      setNewTask({ ...newTask, title: "", description: "" })

    } catch (error) { console.log('ocorreu um erro', error) }
    finally { refreshData() }
  }

  if (!taskList) <>Loading tasks...</>
  else return (
    <div className="w-screen h-screen grid grid-cols-1 place-items-center bg-slate-100">
      <div className="w-4/12">
        <NewTask handleCreateTask={handleCreateTask} newTask={newTask} setNewTask={setNewTask} />
        <TaskList>{taskList?.map((task: any, index: number) => (<TaskItem tasks={taskList} task={task} key={task.id} index={index} />))}</TaskList>

      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const tasks: any = await prisma.task.findMany({ where: { email: session?.user?.email } })

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


{/* <div>
        <h1>Minha conta</h1>
        <p>Bem-vindo, {data?.user?.name}</p>
        <p>Email: {data?.user?.email}</p>
        <img src={data?.user?.image} width="100" style={{ borderRadius: '50%' }} />

        <button className="mt-10" onClick={() => signOut(
          {
            redirect: true,
            callbackUrl: '/',
          }
        )}>Sair da conta</button>
      </div> */}
