// export const enrollFingerprint = async (): Promise<number | null> => {
//     try {
//       const response = await fetch("http://192.168.1.7/enroll", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
  
//       const data = await response.json();
//       console.log(data);
//       if (data.success) {
//         return data.fingerId; 
//       } else {
//         return null; 
//       }
//     } catch (error) {
//       console.error("Fingerprint enrollment error:", error);
//       return null;
//     }
//   }
  
export const enrollFingerprint = (): Promise<number | null> => {
    return fetch("http://192.168.1.7/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            return data.fingerId;
        } else {
            return null;
        }
    })
    .catch(error => {
        console.error("Fingerprint enrollment error:", error);
        return null;
    });
}