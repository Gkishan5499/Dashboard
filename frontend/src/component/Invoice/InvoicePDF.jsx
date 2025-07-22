// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Font,
// } from "@react-pdf/renderer";

// // Register font
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5Q.ttf" },
//   ],
// });

// const styles = StyleSheet.create({
//   page: {
//     fontFamily: "Roboto",
//     fontSize: 11,
//     padding: 30,
//     lineHeight: 1.5,
//     color: "#000",
//   },
//   logo: { height: 60, marginBottom: 10 },
//   header: { fontSize: 16, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
//   section: { marginBottom: 10 },
//   row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
//   bold: { fontWeight: "bold" },
//   tableHeader: { backgroundColor: "#f0f0f0", padding: 4 },
//   footer: {
//     marginTop: 20,
//     fontSize: 9,
//     color: "#666",
//     textAlign: "center",
//     borderTop: "1px solid #ccc",
//     paddingTop: 10,
//   },
// });

// const SalarySlipPDF = ({ data }) => {
//   const totalEarnings = data.earnings.reduce((sum, item) => sum + Number(item.amount), 0);
//   const totalDeductions = data.deductions.reduce((sum, item) => sum + Number(item.amount), 0);
//   const taxAmount = (totalEarnings * (Number(data.tax) || 0)) / 100;
//   const netSalary = totalEarnings - totalDeductions - taxAmount;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {data.logo && <Image src={data.logo} style={styles.logo} />}
//         <Text style={styles.header}>Salary Slip</Text>

//         <View style={styles.section}>
//           <View style={styles.row}><Text>Name:</Text><Text>{data.name}</Text></View>
//           <View style={styles.row}><Text>Employee ID:</Text><Text>{data.employeeId}</Text></View>
//           <View style={styles.row}><Text>Title:</Text><Text>{data.title}</Text></View>
//           <View style={styles.row}><Text>Directorate:</Text><Text>{data.directorate}</Text></View>
//           <View style={styles.row}><Text>Department:</Text><Text>{data.department}</Text></View>
//           <View style={styles.row}><Text>Bank:</Text><Text>{data.bankName}</Text></View>
//           <View style={styles.row}><Text>Account:</Text><Text>{data.bankAccount}</Text></View>
//           <View style={styles.row}><Text>Payment Date:</Text><Text>{data.paymentDate}</Text></View>
//         </View>

//         <Text style={styles.bold}>Earnings</Text>
//         {data.earnings.map((e, i) => (
//           <View key={i} style={styles.row}>
//             <Text>{e.label}</Text>
//             <Text>₹ {parseFloat(e.amount).toFixed(2)}</Text>
//           </View>
//         ))}
//         <View style={styles.row}><Text style={styles.bold}>Total Earnings</Text><Text style={styles.bold}>₹ {totalEarnings.toFixed(2)}</Text></View>

//         <Text style={[styles.bold, { marginTop: 10 }]}>Deductions</Text>
//         {data.deductions.map((d, i) => (
//           <View key={i} style={styles.row}>
//             <Text>{d.label}</Text>
//             <Text>₹ {parseFloat(d.amount).toFixed(2)}</Text>
//           </View>
//         ))}
//         <View style={styles.row}><Text>Tax ({data.tax}%)</Text><Text>₹ {taxAmount.toFixed(2)}</Text></View>
//         <View style={styles.row}><Text style={styles.bold}>Total Deductions</Text><Text style={styles.bold}>₹ {(totalDeductions + taxAmount).toFixed(2)}</Text></View>

//         <View style={[styles.row, { marginTop: 10 }]}>
//           <Text style={styles.bold}>Net Salary</Text>
//           <Text style={styles.bold}>₹ {netSalary.toFixed(2)}</Text>
//         </View>

//         <Text style={styles.footer}>
//           This is a computer-generated salary slip and does not require a physical signature. Please verify all details and contact HR in case of any discrepancies.
//         </Text>
//       </Page>
//     </Document>
//   );
// };

// export default SalarySlipPDF;


import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register font
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5Q.ttf" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    padding: 30,
    lineHeight: 1.5,
    color: "#000",
  },
  logo: { height: 60, marginBottom:18, width:"100%", objectFit:"contain"},
  header: { fontSize:19, marginBottom:12, textAlign: "center", fontWeight:"bold" },
  section: { marginBottom: 10, borderBottom:1, borderBottomColor:'black' },
  employeeDetails: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  column: { width: "48%", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bold: { fontWeight: "bold" },
  earning:{borderBottom:1, borderBottomColor:'black'},
  deduction:{borderBottom:1, borderBottomColor:'black'},
  tableHeader: { backgroundColor: "#f0f0f0", padding: 4 },
  tableCell: { padding: 6, textAlign: "right" },
  footer: {
    marginTop: 20,
    fontSize: 9,
    color: "#666",
    textAlign: "center",
    borderTop: "1px solid #ccc",
    paddingTop: 10,
  },
});

const SalarySlipPDF = ({ data }) => {
  const totalEarnings = data.earnings.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalDeductions = data.deductions.reduce((sum, item) => sum + Number(item.amount), 0);
  const taxAmount = (totalEarnings * (Number(data.tax) || 0)) / 100;
  const netSalary = totalEarnings - totalDeductions - taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.logo && <Image src={data.logo} style={styles.logo} />}
        <Text style={styles.header}>Salary Slip</Text>

        {/* Employee Details Section */}
        <View style={styles.section}>
          <View style={styles.employeeDetails}>
            <View style={styles.column}>
              <View style={styles.row}><Text style={{fontSize:12}}>Name:</Text><Text>{data.name}</Text></View>
              <View style={styles.row}><Text style={{fontSize:12}}>Employee ID:</Text><Text>{data.employeeId}</Text></View>
              <View style={styles.row}><Text style={{fontSize:12}}>Title:</Text><Text>{data.title}</Text></View>
              <View style={styles.row}><Text style={{fontSize:12}}>Directorate:</Text><Text>{data.directorate}</Text></View>
            </View>
            <View style={styles.column}>
              <View style={styles.row}><Text style={{fontSize:12}}>Department:</Text><Text>{data.department}</Text></View>
              <View style={styles.row}><Text style={{fontSize:12}}>Bank:</Text><Text>{data.bankName}</Text></View>
              <View style={styles.row}><Text style={{fontSize:12}}>Account:</Text><Text>{data.bankAccount}</Text></View>
              <View style={styles.row}><Text style={{fontSize:12}}>Payment Date:</Text><Text>{data.paymentDate}</Text></View>
            </View>
          </View>
        </View>

        {/* Earnings Section */}
        <Text style={[styles.bold, {fontSize:14} ]}>Earnings</Text>
        <View style={styles.earning}>
          {data.earnings.map((e, i) => (
            <View key={i} style={styles.row}>
              <Text>{e.label}</Text>
              <Text>₹ {parseFloat(e.amount).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text style={styles.bold}>Total Earnings</Text>
            <Text style={styles.bold}>₹ {totalEarnings.toFixed(2)}</Text>
          </View>
        </View>

        {/* Deductions Section */}
        <Text style={[styles.bold, { marginTop: 10 , fontSize:14}]}>Deductions</Text>
        <View style={styles.deduction} >
          {data.deductions.map((d, i) => (
            <View key={i} style={styles.row}>
              <Text>{d.label}</Text>
              <Text>₹ {parseFloat(d.amount).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text>Tax ({data.tax}%)</Text>
            <Text>₹ {taxAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bold}>Total Deductions</Text>
            <Text style={styles.bold}>₹ {(totalDeductions + taxAmount).toFixed(2)}</Text>
          </View>
        </View>

        {/* Net Salary Section */}
        <View style={[styles.row, { marginTop: 10}]}>
          <Text style={styles.bold}>Net Salary</Text>
          <Text style={styles.bold}>₹ {netSalary.toFixed(2)}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This is a computer-generated salary slip and does not require a physical signature. Please verify all details and contact HR in case of any discrepancies.
        </Text>
      </Page>
    </Document>
  );
};

export default SalarySlipPDF;
