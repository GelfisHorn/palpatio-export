const EN = {
    errors: {
        id: "The order ID is incorrect",
        sameStatus: "This is the current state",
        invalidStatus: "The status you entered is not valid",
        findOrder: "This order does not exist",
        catch: "There was an error changing the state"
    },
    success: {
        changeStatus: "Order status changed successfully"
    }
}

const ES = {
    errors: {
        id: "El ID de la orden es incorrecto",
        sameStatus: "Este es el estado actual",
        invalidStatus: "El estado que ingresaste es incorrecto",
        findOrder: "Esta orden no existe",
        catch: "Hubo un error al cambiar el estado"
    },
    success: {
        changeStatus: "El estado de la orden se cambió con éxito"
    }
}

const locales = {
    EN,
    ES
}

export default locales;
export { EN, ES };