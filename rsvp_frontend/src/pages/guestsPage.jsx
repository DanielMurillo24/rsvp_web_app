
export const GuestsPage = () => {
  return (
     <div className="container mt-5">
      <h1>Lista de Invitados</h1>
      {/* Aquí iría tu formulario de invitados */}
      <button onClick={handleSave} className="btn btn-success mt-3">
        Guardar
      </button>
    </div>
  )
}
