const STATUS = {
    onhold: {
        icon: "fa-solid fa-arrows-spin",
        text: "En espera",
        color: {
            text: "text-sky-500", border: "hover:border-sky-500", active: "border-sky-500"
        }
    },
    sending: {
        icon: "fa-sharp fa-solid fa-truck-fast",
        text: "Enviando",
        color: {
            text: "text-orange-500", border: "hover:border-orange-500", active: "border-orange-500"
        }
    },
    received: {
        icon: "fa-solid fa-box-circle-check",
        text: "Recibido",
        color: {
            text: "text-green-500", border: "hover:border-green-500", active: "border-green-500"
        }
    },
    cancelled: {
        icon: "fa-solid fa-circle-xmark",
        text: "Cancelado",
        color: {
            text: "text-red-500", border: "hover:border-red-500", active: "border-red-500"
        }
    }
}

const TYPE = {
    "vehicle": "Vehiculo",
    "furniture": "Mueble",
    "package": "Paquete",
    "pallet": "Pallet",
    "tank": "Tanque",
    "other": "Otro"
}

const CATEGORY = {
    "vehicle": "Vehiculo",
    "truck": "Camión",
    "car": "Automovil",
    "engine": "Motor",
    "bike": "Bicicleta",
    "furniture": "Mueble",
    "box": "Caja",
    "tank": "Tanque",
    "pallet": "Pallet",
    "moving": "Mudanza",
    "other": "Otro"
}

const CONTENT = {
    "vehicle": [
        {
            "id": "truck",
            "name": "Camión"
        },
        {
            "id": "car",
            "name": "Auto"
        },
        {
            "id": "engine",
            "name": "Motor"
        }
    ],
    "furniture": [
        {
            "id": "chair",
            "name": "Silla"
        },
        {
            "id": "table",
            "name": "Mesa"
        }
    ],
    "package": [
        {
            "id": "small",
            "name": "Paquete chico"
        },
        {
            "id": "medium",
            "name": "Paquete mediano"
        },
        {
            "id": "big",
            "name": "Paquete grande"
        }
    ],
    "pallet": [
        {
            "id": "pallet",
            "name": "Pallet"
        }
    ],
    "tank": [
        {
            "id": "water",
            "name": "Agua"
        },
        {
            "id": "fuel",
            "name": "Combustible"
        },
        {
            "id": "storage",
            "name": "Almacenamiento"
        },
        {
            "id": "gas",
            "name": "Gas"
        }
    ],
    "other": [
        {
            "id": "tools",
            "name": "Herramientas"
        },
        {
            "id": "gardening",
            "name": "Jardinería"
        },
        {
            "id": "travel",
            "name": "Articulos de viaje"
        },
        {
            "id": "electronics",
            "name": "Electrónicos"
        }
    ]
}

export {
    STATUS,
    TYPE,
    CATEGORY,
    CONTENT
}