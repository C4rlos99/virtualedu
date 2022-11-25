import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export default function ResultadoPDF(props) {
  const { tituloEscenario, resultado } = props;

  const estilos = StyleSheet.create({
    pagina: {
      paddingHorizontal: 67,
      paddingVertical: 47.5,
    },

    titulo: {
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 18,
      textAlign: "center",
      textDecoration: "underline",
    },

    tabla: {
      border: 1.3,
      borderColor: "black",
      borderStyle: "solid",
      marginBottom: -1.35,
      padding: "7 6 4 6",
      fontSize: 12,
    },

    interaccion: {
      minHeight: 50,
      fontSize: 12,
      border: 1,
      borderColor: "black",
      borderStyle: "solid",
      padding: 6,
      backgroundColor: "#EDF7FF",
    },

    tituloEscena: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={estilos.pagina}>
        <View style={estilos.titulo}>
          <Text>{tituloEscenario}</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[estilos.tabla, { fontWeight: "bold", width: 200 }]}>
              Nombre del evaludado
            </Text>
            <Text style={[estilos.tabla, { marginLeft: -1, width: "100%" }]}>
              {resultado.nombre_usuario}
            </Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[estilos.tabla, { fontWeight: "bold", width: 200 }]}>
              Fecha de evaluación
            </Text>
            <Text style={[estilos.tabla, { marginLeft: -1, width: "100%" }]}>
              {resultado.fecha_evaluacion.split("T")[0]}
            </Text>
          </View>
        </View>

        {JSON.parse(resultado.respuestas).map((respuesta, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={estilos.tituloEscena}>
              Escena {index + 1}: {respuesta.titulo_escena}
            </Text>
            <View style={estilos.interaccion}>
              <Text>{respuesta.interaccion}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
