

export const enrollFingerprint = (): Promise<number | null> => {
    return fetch(`http://${process.env.ESP_IP}/enroll`, {
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

export const verifyFingerprint = (): Promise<number | null> => {
    return fetch(`http://${process.env.ESP_IP}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
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

export const deleteFingerprint = (fingerId: number): Promise<boolean> => {
    return fetch(`http://${process.env.ESP_IP}/clearOne?id=${fingerId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(`Fingerprint ID ${fingerId} deleted successfully.`);
            return true;
        } else {
            console.error(`Failed to delete fingerprint ID ${fingerId}:`, data.message);
            return false;
        }
    })
    .catch(error => {
        console.error("Fingerprint deletion error:", error);
        return false;
    });
};