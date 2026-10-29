import sqlite3

conexion = sqlite3.connect("BD_Pedidos.db")

cursor = conexion.cursor()

cursor.execute("""
    create table if not exists pedidos (
            id integer primary key autoincrement,
            pedido varchar(100) not null,
            precio real not null,
            estado text not null,
            entrega varchar(100)
            )
""")

conexion.commit()
conexion.close()
print("base de datos creada correctamente")