import React, { useContext, useEffect, useState } from 'react'
import { Page, Text, View, Document, PDFViewer } from '@react-pdf/renderer';
import clienteAxios from '../../config/axios';
import { useLocation } from 'react-router-dom';
import { HOOKContext } from '../../hooks/authContext';

const PedidoPDF = () => {
    const [auth,setAuth]=useContext(HOOKContext)
    // // location
    const ref = useLocation();

    const idPedido = ref.pathname.substring(13)
    // usestate
    const [pedidos, setPedidos] = useState([]);
    const { _id, cliente, pedido, total } = pedidos
    // Consulta bd con nº pedido
    const consultaBDPedido = async () => {
        const consulta = await clienteAxios.get(`/pedidos/${idPedido}`)
        setPedidos(consulta.data);
    }
    useEffect(() => {
        consultaBDPedido()
    }, [pedidos])
    return (
        <>{
            pedidos.length == 0 ? null :
                <PDFViewer width="100%" height="900px">
                    <Document >
                        <Page size="LETTER">
                            <View style={{ fontSize: 10, maxWidth: "95%", height: "760", margin: "10 auto", border: 1 }}>
                                <Text style={{ fontSize: 30, margin: "10 auto 20 auto" }}>Hoja de Pedido</Text>
                                <View style={{ flexDirection: 'row', padding: "2 10" }}>
                                    <View style={{ width: '50%' }}>
                                        <View style={{ flexDirection: 'row', margin: 5 }}>
                                            <Text style={{ paddingBottom: 5, width: '50%' }}>N° PEDIDO:</Text>
                                            <Text style={{ paddingBottom: 5, width: '50%' }}>{_id}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 5, }}>
                                            <Text style={{ paddingBottom: 5, width: '50%' }}>NOMBRE COMERCIAL:</Text>
                                            <Text style={{ paddingBottom: 5, width: '50%' }}>Gestiones Pedidos S.L</Text>
                                        </View>
                                        <View style={{ border: 1, padding: 4, margin: 5 }}>
                                            <Text style={{ paddingBottom: 5, fontSize: 16, textAlign: "center" }}>DATOS DE FACTURACIÓN</Text>
                                            <View style={{ flexDirection: 'row', fontSize: 9 }}>
                                                <Text style={{ paddingBottom: 5, width: '50%', }}>Cliente:</Text>
                                                <Text style={{ paddingBottom: 5, width: '50%', textAlign: 'right', textTransform: "capitalize" }}>{cliente.nombre} {cliente.apellido}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', fontSize: 9 }}>
                                                <Text style={{ paddingBottom: 5, width: '50%', }}>Telefono:</Text>
                                                <Text style={{ paddingBottom: 5, width: '50%', textAlign: 'right' }}>{cliente.telefono}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', fontSize: 9 }}>
                                                <Text style={{ paddingBottom: 5, width: '50%', }}>Empresa</Text>
                                                <Text style={{ paddingBottom: 5, width: '50%', textAlign: 'right' }}>{cliente.empresa}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 5, marginLeft: 10, marginTop: 5 }}>
                                            <Text style={{ paddingBottom: 5, width: '50%' }}>FECHA CREACION PEDIDO:</Text>
                                            <Text style={{ paddingBottom: 5, width: '50%', textAlign: "center" }}>{new Date().toLocaleDateString()}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                            <Text style={{ paddingBottom: 15, width: '50%' }}>FECHA ENTREGA:</Text>
                                            <Text style={{ paddingBottom: 5, width: '50%', textAlign: "center" }}>{new Date().getDate() + 3}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</Text>
                                        </View>
                                        <View style={{ border: 1, padding: 5, margin: 5 }}>
                                            <Text style={{ paddingBottom: 5, fontSize: 16, textAlign: "center" }}>DATOS DE ENTREGA</Text>
                                            <View style={{ flexDirection: 'row', fontSize: 9 }}>
                                                <Text style={{ paddingBottom: 5, width: '50%', }}>Entregar a:</Text>
                                                <Text style={{ paddingBottom: 5, width: '50%', textAlign: 'right', textTransform: "capitalize" }}>{cliente.nombre}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', fontSize: 9 }}>
                                                <Text style={{ paddingBottom: 5, width: '50%', }}>Telefono:</Text>
                                                <Text style={{ paddingBottom: 5, width: '50%', textAlign: 'right' }}>{cliente.telefono}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', fontSize: 9 }}>
                                                <Text style={{ paddingBottom: 5, width: '50%' }}>Dirección:</Text>
                                                <Text style={{ paddingBottom: 5, width: '50%', textAlign: 'right' }}>{cliente.empresa}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{width: 530, height: 200, border: 2, margin: "10 auto" }}>
                                    <View style={{ borderBottom: 1, flexDirection: 'row', justifyContent: "space-around", fontSize: 12 }}>
                                        <Text style={{ padding: "5 0", width: 207, margin: "0 auto", borderRight: 1, textAlign: "center" }}>Productos</Text>
                                        <Text style={{ padding: "5 40 5 0", width: 130, textAlign: "center", borderRight: 1, margin: "0 auto" }}>Precio</Text>
                                        <Text style={{ padding: "5 0 0 10", width: 95 }}>Cantidad</Text>
                                    </View>
                                    {
                                        pedido.map(producto => (

                                            <View View key={_id + producto._id} style={{ borderBottom: 1, flexDirection: 'row', justifyContent: "space-around", fontSize: 13 }}>
                                                <Text style={{ padding: "5 0 5 0", width: 207, borderRight: 1, textAlign: "center" }}>{producto.producto.nombre}</Text>
                                                <Text style={{ padding: "5 30 0 0", width: 130, textAlign: "center", borderRight: 1 }}>{producto.producto.precio}</Text>
                                                <Text style={{ padding: "5 30 0 0", width: 47 }}>{producto.cantidad}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                                <View style={{ border: 0, padding: 10, textAlign: "right", maxWidth: 520, margin: "50 30 0 auto" }}>
                                    <Text style={{ marginBottom: 10, fontSize: 15,borderBottom:1 }}>Total Pedido:</Text>
                                    <Text style={{ fontSize: 20, fontWeight: 900 }}>{total.toFixed(2)}€</Text>
                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer >
        }

        </>
    )
}

export default PedidoPDF