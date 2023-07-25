const EN = {
    errors: {
        getAllCatch: "There was an error getting the clients",
        assignOrderId: "Invalid id",
        assignOrderUser: "This user does not exist",
        assignOrderOrder: "This order does not exist",
        assignOrderCatch: "There was an error assigning order",
        assignOrderAlreadyAssigned: "This order is already assigned"
    }
}

const ES = {
    errors: {
        getAllCatch: "Hubo un error al obtener los clientes",
        assignOrderId: "ID no válido",
        assignOrderUser: "Este usuario no existe",
        assignOrderOrder: "Esta orden no existe",
        assignOrderCatch: "Hubo un error al asignar el orden",
        assignOrderAlreadyAssigned: "Esta orden ya se encuentra asignada"
    }
}

const locales = {
    EN,
    ES
}

export default locales;
export { EN, ES };