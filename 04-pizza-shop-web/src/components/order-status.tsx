export type OrderStatus = "pending" | "canceled" | "processing" | "delivering" | "delivered"

interface OrderStatusProps {
    status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = { 
    pending: "Pendente",
    canceled: "Cancelado",
    processing: "Processando",
    delivering: "Em Entrega",
    delivered: "Entregue",
}

export function OrderStatus({ status }: OrderStatusProps) {
    return (
        <div>
            <div className="flex items-center gap-2">
                {status === "pending" && (
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                )}

                {status === "canceled" && (
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                )}

                {status === "delivered" && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                )}

                {["processing", "delivering"].includes(status) && (
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                )}
                
                

                <span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
            </div>
        </div>
    )
}