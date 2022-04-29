export function NewTask({ handleCreateTask, newTask, setNewTask }) {
  return (
    <section className="w-full">

      <form onSubmit={handleCreateTask}>
        <input
          // tailwind input text
          // remove autocomplete
          autoComplete="off"

          className="w-full px-3 py-2 text-gray-700
          focus:outline-none
          focus:shadow-outline
            leading-tight
            border-gray-500            
            px-6
            py-4
            flex
            items-center
            bg-white
            rounded-lg
            "
          type="text" name="description" value={newTask?.description} placeholder="Crie uma nova tarefa..." onChange={e => setNewTask({
            ...newTask,
            description: e.target.value
          })} />
      </form>
    </section>
  )
}