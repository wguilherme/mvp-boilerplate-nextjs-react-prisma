export function TaskItem({ task, key }) {
  return (
    <div key={task} className="w-full p-3">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-4">
          <h3 className="text-xl font-bold">{task?.title}</h3>
          <h3 className="text-xl font-light">{task?.description}</h3>
          <h5>Completed: {task?.isDone}</h5>
        </div>
      </div>
    </div>

  )
}