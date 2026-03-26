import React from 'react';

const RegisterForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <div className="Rcenter_box_child">
      <div className="Rcenter_inbox">
        <form className="Lform" onSubmit={handleSubmit}>
          {['username', 'password', 'height', 'weight', 'age', 'gender'].map(
            (field) => (
              <div key={field}>
                <p className="Rlogin_text">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </p>

                <input
                  name={field}
                  placeholder={`Enter ${field}`}
                  className="Linput"
                  type={field === 'password' ? 'password' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            )
          )}

          <button type="submit" className="Lenter_button" disabled={loading}>
            {loading ? 'Registering...' : '➡️ Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
