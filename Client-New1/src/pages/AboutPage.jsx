import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Truck, 
  Clock, 
  Users, 
  Award, 
  Heart,
  CheckCircle,
  Star
} from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is protected with industry-leading security measures"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your products delivered within 24-48 hours"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our customer support team is available round the clock"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our team of experts ensures quality service"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Heart },
    { number: "50K+", label: "Products Sold", icon: Award },
    { number: "99%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Customer Support", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
            >
              About <span className="text-primary">ElectroShop</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              We are passionate about bringing you the latest and greatest in electronics. 
              Our mission is to provide high-quality products with exceptional customer service.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the best shopping experience with our comprehensive features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-background p-6 rounded-xl shadow-lg border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-foreground mb-8"
            >
              Our Story
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                Founded in 2020, ElectroShop started as a small local electronics store with a big dream: 
                to make cutting-edge technology accessible to everyone. What began as a passion project 
                has grown into one of the most trusted names in online electronics retail.
              </p>
              <p>
                Today, we serve customers across the country, offering a carefully curated selection of 
                the latest gadgets, computers, and electronic accessories. Our commitment to quality, 
                customer service, and competitive pricing remains at the heart of everything we do.
              </p>
              <p>
                We believe that technology should enhance your life, not complicate it. That's why we 
                go beyond just selling products – we provide expert advice, comprehensive support, and 
                a shopping experience that puts you first.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;