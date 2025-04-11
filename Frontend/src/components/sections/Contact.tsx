import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import styles from './Contact.module.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      });
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactHeader}>
        <h2>Get In Touch</h2>
        <p>Feel free to reach out for collaborations or just a friendly hello</p>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <FaEnvelope />
            </div>
            <div className={styles.infoContent}>
              <h3>Email</h3>
              <a href="mailto:hamzakamran843@gmail.com">hamzakamran843@gmail.com</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <FaPhone />
            </div>
            <div className={styles.infoContent}>
              <h3>Phone</h3>
              <p>+92 305 2449933</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <FaMapMarkerAlt />
            </div>
            <div className={styles.infoContent}>
              <h3>Location</h3>
              <p>Lahore, Pakistan</p>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/hamza-kamran-7b1a85294/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaLinkedin />
            </a>
            
          </div>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {status.error && (
            <div className={styles.errorMessage}>
              {status.error}
            </div>
          )}
          {status.success && (
            <div className={styles.successMessage}>
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className={styles.formInput}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={status.loading}
          >
            {status.loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

