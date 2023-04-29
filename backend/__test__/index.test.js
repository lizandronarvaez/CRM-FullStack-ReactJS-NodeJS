/* eslint-disable no-undef */
import axios from "axios";
const url = "http://localhost:5000/clientes";

describe("Ruta Clientes", () => {
    // endpoinnt cliente get
    test("Devolver un 200 y mostrar datos", async () => {
        const res = await axios.get(url);
        const { data } = res;
        console.log(typeof data);
        expect(res.status).toBe(200);
    });

    // endpoint CLIENTE POST
    test("Crear Cliente y devolver que ha sido creado correcamente", async () => {
        const res = await axios.post(url, {
            nombre: "prueba2",
            apellido: "prueba2",
            empresa: "desarrollo web node-mmongodb",
            email: "correo@example.com",
            telefono: "612545888"
        });
        expect(res.status).toBe(201);
        expect(res.data).toEqual({ mensaje: "Cliente creado correctamente" });
    });
});
