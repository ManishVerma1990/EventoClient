import { motion } from "framer-motion";
import "./HomePage.css";
import { Link } from "react-router-dom";

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

const HomePage: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Smart Event Automation",
      desc: "Automate registrations, reminders, and analytics — all in one place.",
      icon: "⚙️",
    },
    {
      title: "Real-Time Insights",
      desc: "Track attendance, feedback, and engagement with live dashboards.",
      icon: "📊",
    },
    {
      title: "Seamless Collaboration",
      desc: "Coordinate effortlessly between teams, vendors, and participants.",
      icon: "🤝",
    },
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Plan. Manage. Celebrate.</h1>
          <p>The all-in-one platform to create and manage unforgettable events.</p>
          <Link to={"/event"} className="hero-btn">
            Discover
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>
          Why Choose <span className="highlight">EventEase?</span>
        </h2>
        <div className="feature-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Host Your Next Event?</h2>
        <p>Simplify planning and make your event truly unforgettable.</p>
        <Link to="/login" className="cta-btn">
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer>© {new Date().getFullYear()} EventEase. All rights reserved.</footer>
    </div>
  );
};

export default HomePage;
