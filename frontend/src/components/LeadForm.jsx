import "./LeadForm.css";

function LeadForm({
  name,
  setName,
  email,
  setEmail,
  budget,
  setBudget,
  message,
  setMessage,
  postdetails,
}) {
  return (
    <div className="form-container">

      <h2>Get a Free Website Quote</h2>
      <p className="form-subtitle">
        Fill out the form below and we'll contact you within 24 hours.
      </p>

      <form onSubmit={postdetails}>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Budget Range</label>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        >
          <option value="">Select Budget</option>
          <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
          <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
          <option value="₹50,000+">₹50,000+</option>
        </select>

        <label>Project Description</label>
        <textarea
          placeholder="Describe your project..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          required
        />

        <button type="submit">
          Submit Inquiry
        </button>

      </form>

    </div>
  );
}

export default LeadForm;