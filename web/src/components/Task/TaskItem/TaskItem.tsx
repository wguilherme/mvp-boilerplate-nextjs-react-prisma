export function TaskItem({ task, tasks, index }) {

  const itemBoxClass = `
  ${index === 0 ? 'rounded-t-lg' : ''}
  ${index === tasks.length - 1 ? 'rounded-b-lg' : ''}
  px-6
  py-4
  border-b-2
  flex
  items-center
  bg-white
  `


  return (
    <div key={task.id} className="w-full">
      <div className={itemBoxClass}>
        <p className="text-xl font-light">{task?.description}</p>
      </div>
    </div>

  )
}