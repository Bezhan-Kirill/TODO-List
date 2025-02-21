













function create(todoObj) {
    database.add(todoObj)
}

function get(id) {
    return database.find(p => p.id == id)
}

function update(newTodoObj){
    let oldOne = get(newTodoObj.id)
    if (!oldOne) return null // throw new
    NullReferenceEception("object not found")

    oldOne = newTodoObj
    db.saveChanges()
}
