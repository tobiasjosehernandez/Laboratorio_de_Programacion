from tkinter import *
from tkinter import messagebox
from BD_py import *

def limpiar():
    entradaId.delete(0, END)
    entradaPedido.delete(0, END)
    entradaPrecio.delete(0, END)
    entradaEstado.delete(0, END)
    entradaEntrega.delete(0, END)

def guardar():
    pedido = entradaPedido.get()
    precio = entradaPrecio.get()
    estado = entradaEstado.get()
    entrega = entradaEntrega.get()

    if pedido == "" or precio == "" or estado == "" or entrega == "":
        messagebox.showwarning(
            "Atencion",
            "Todos los campos deben estar completos"
        )
        return

    try:
        precio = float(precio)

        if precio < 1:
            messagebox.showwarning(
                "Atencion",
                "El precio no puede ser negativo"
            )
            return
        
    except ValueError:
        messagebox.showerror(
            "Error",
            "El precio debe ser positivo(mayor a cero)"
        )
    else:
        conexion = sqlite3.connect("BD_Pedidos.db")
        cursor = conexion.cursor()

        cursor.execute(
                "insert into pedidos (pedido, precio, estado, entrega) values (?, ?, ?, ?)",
                (pedido, precio, estado, entrega)
            )

        conexion.commit()
        conexion.close()

        messagebox.showinfo(
            "Correcto",
            "Pedido generado con exito"
        )

def buscar():

    id = entradaId.get()

    conexion = sqlite3.connect("BD_Pedidos.db")
    cursor = conexion.cursor()

    cursor.execute(
        "select * from pedidos where id = ?",
        (id,)
    )

    pedido = cursor.fetchone()

    conexion.close()

    if pedido is not None:
        entradaPedido.delete(0, END)
        entradaPrecio.delete(0, END)
        entradaEstado.delete(0, END)
        entradaEntrega.delete(0, END)

        entradaPedido.insert(0, pedido[1])
        entradaPrecio.insert(0, pedido[2])
        entradaEstado.insert(0, pedido[3])
        entradaEntrega.insert(0, pedido[4])

    else:
        messagebox.showwarning(
            "Atencion",
            "No se encontro el pedido"
        )

def modificar():

    id = entradaId.get()
    pedido = entradaPedido.get()
    precio = entradaPrecio.get()
    estado = entradaEstado.get()
    entrega = entradaEntrega.get()

    try:
        precio = float(entradaPrecio.get())

        if precio < 0:
            messagebox.showwarning(
                "Atencion",
                "El precio debe ser positivo(mayor a cero)"
            )
    except ValueError:
        messagebox.showerror(
            "Error",
            "El precio debe ser positivo"
        )
    else:
        conexion = sqlite3.connect("BD_Pedidos.db")
        cursor = conexion.cursor()

        cursor.execute(
            """update pedidos
                set pedido = ?, precio = ?, estado = ?, entrega = ?
                where id = ? """,
                (pedido, precio, estado, entrega, id)
        )

        conexion.commit()

        filas = cursor.rowcount

        conexion.close()

        if filas > 0:
            messagebox.showinfo(
                "Atencion",
                "Pedido modificado con exito"
            )
        else:
            messagebox.showwarning(
                "Atencion",
                "No se encontro el pedido"
            )

def eliminar():
    id = entradaId.get()

    if id == "":
        messagebox.showwarning(
            "Atencion",
            "ingrese el ID del pedido"
        )
        return

    respuesta = messagebox.askyesno(
        "Confirmacion",
        "¿Esta seguro de eliminar el pedido?"
    )

    if respuesta:
        conexion = sqlite3.connect("BD_Pedidos.db")
        cursor = conexion.cursor()

        cursor.execute(
            "delete from pedidos where id = ?",
            (id,)
        )

        conexion.commit()
        filas = cursor.rowcount
        conexion.close()

        if filas > 0:
            messagebox.showinfo(
                "Atencion",
                "Pedido eliminado correctamente"
            )
        else:
            messagebox.showwarning(
                "Atencion",
                "No se encontro el pedido"
            )

ventana = Tk()
ventana.geometry("700x700")
ventana.title("GESTION DE PEDIDOS")
ventana.config(bg="#215e9b")
ventana.resizable(0, 0)

#Titulo
titulo = Label (
    ventana ,
    text="Gestion de pedidos",
    fg="white" ,
    font=("Arial", 18 , "bold"),
    bg="#215e9b"
)
titulo.pack(pady=15)

#ID
labelId = Label(ventana, text= "ID",
               bg="#70777e",
                 fg="white")
labelId.pack()

entradaId = Entry(ventana)
entradaId.pack()

#Pedido
labelPedido = Label(ventana, text="PEDIDO",
               bg="#70777e",
                 fg="white")
labelPedido.pack()

entradaPedido = Entry(ventana)
entradaPedido.pack()

#Precio
labelPrecio = Label(ventana, text="PRECIO",
               bg="#70777e",
                 fg="white")
labelPrecio.pack()

entradaPrecio = Entry(ventana)
entradaPrecio.pack()

#Estado
labelEstado = Label (ventana, text="ESTADO",
               bg="#70777e",
                 fg="white")
labelEstado.pack()

entradaEstado = Entry(ventana)
entradaEstado.pack()

#Entrega
labelEntrega = Label(ventana, text="ENTREGA",
               bg="#70777e",
                 fg="white")
labelEntrega.pack()

entradaEntrega = Entry(ventana)
entradaEntrega.pack()

#Botones
botonGuardar = Button(
    ventana,
    text="Guardar",
    bg="green",
    fg="white",
    bd=5,
    relief="solid",
    width=15,
    command=guardar
)
botonGuardar.pack(pady=5)

botonBuscar = Button(
    ventana,
    text="Buscar",
    width=15,
    bd=5,
    relief="raised",
    command=buscar
)
botonBuscar.pack(pady=5)

botonModificar = Button(
    ventana,
    text="Modificar",
    bg="blue",
    fg="white",
    width=15,
    bd=5,
    relief="sunken",
    command=modificar
)
botonModificar.pack(pady=5)

botonEliminar = Button(
    ventana,
    text="Eliminar",
    bg="red",
    fg="white",
    width=15,
    bd=5,
    relief="groove",
    command=eliminar
)
botonEliminar.pack(pady=5)

botonLimpiar = Button(
    ventana,
    text="Limpiar",
    bg="gray",
    fg="white",
    width=15,
    bd=5,
    relief="ridge",
    command=limpiar
)

botonLimpiar.pack(pady=5)

ventana.mainloop()
