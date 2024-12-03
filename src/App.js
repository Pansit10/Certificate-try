import React, { useState } from "react";
import jsPDF from "jspdf";

function AdminCertificateApp() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    placeOfBirth: "",
    fatherName: "",
    motherName: "",
    baptismDate: "",
    minister: "",
    email: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit request
  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([...requests, formData]);
    setFormData({
      name: "",
      dob: "",
      placeOfBirth: "",
      fatherName: "",
      motherName: "",
      baptismDate: "",
      minister: "",
      email: "",
    });
  };

  // Generate PDF
  const generatePDF = (data) => {
    const doc = new jsPDF("p", "mm", "a4");

    // Set background color
    doc.setFillColor(230, 230, 250); // Light lavender
    doc.rect(0, 0, 210, 297, "F");

    // Certificate content
    doc.setFont("Times", "bold");
    doc.setFontSize(24);
    doc.text("Certificate of Baptism", 105, 40, null, null, "center");

    doc.setFont("Times", "normal");
    doc.setFontSize(14);
    doc.text("This is to certify that", 105, 60, null, null, "center");

    doc.setFontSize(18);
    doc.text(data.name, 105, 70, null, null, "center");

    doc.setFontSize(14);
    doc.text(
      "was solemnly baptized according to the Rite of the Roman Catholic Church",
      105,
      80,
      null,
      null,
      "center"
    );

    doc.text(`on ${data.baptismDate}`, 105, 90, null, null, "center");
    doc.text(`Date of Birth: ${data.dob}`, 20, 110);
    doc.text(`Place of Birth: ${data.placeOfBirth}`, 20, 120);
    doc.text(`Father: ${data.fatherName}`, 20, 130);
    doc.text(`Mother: ${data.motherName}`, 20, 140);
    doc.text(`Officiating Minister: ${data.minister}`, 20, 150);

    // Signature
    doc.text("Signature", 150, 200, null, null, "center");
    doc.line(120, 205, 180, 205);

    doc.save(`${data.name}_Baptismal_Certificate.pdf`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        {isAdmin ? "Admin Dashboard" : "Request a Baptismal Certificate"}
      </h1>

      {!isAdmin ? (
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Name of Baptized:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter full name"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Place of Birth:</label>
            <input
              type="text"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter place of birth"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Father's Name:</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter father's name"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Mother's Name:</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter mother's name"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Date of Baptism:</label>
            <input
              type="date"
              name="baptismDate"
              value={formData.baptismDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Officiating Minister:</label>
            <input
              type="text"
              name="minister"
              value={formData.minister}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter minister's name"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Submit Request
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            style={styles.buttonSecondary}
          >
            Switch to Admin
          </button>
        </form>
      ) : (
        <div style={styles.adminPanel}>
          <h2>Pending Requests</h2>
          {requests.length === 0 ? (
            <p>No requests available.</p>
          ) : (
            <ul style={styles.requestList}>
              {requests.map((req, index) => (
                <li key={index} style={styles.requestItem}>
                  <p>
                    <strong>Name:</strong> {req.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {req.email}
                  </p>
                  <button
                    style={styles.button}
                    onClick={() => generatePDF(req)}
                  >
                    Generate Certificate
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            style={styles.buttonSecondary}
          >
            Switch to User
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonSecondary: {
    marginTop: "10px",
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#6c757d",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  adminPanel: {
    textAlign: "center",
    marginTop: "20px",
  },
  requestList: {
    listStyleType: "none",
    padding: "0",
  },
  requestItem: {
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
};

export default AdminCertificateApp;
