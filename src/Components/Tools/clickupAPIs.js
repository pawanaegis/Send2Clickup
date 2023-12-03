// import axios from 'axios';
// let getToken = async() =>{
//     const code = localStorage.getItem('code')
//     const response = await axios.post(
//         `https://api.airtable.com/v0/${config.airtable_base}/${config.airtable_table_2}`,
//         { fields: {
//           clickupCode: code,
//           ...memberData.fields
//         } },
//         {
//           headers: {
//             Authorization: `Bearer ${config.airtable_api}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

// }