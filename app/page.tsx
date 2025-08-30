"use client"

import type React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://formspree.io/f/xwpnkkrd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="font-heading font-bold text-xl text-foreground">MM Investment Management</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="#team" className="text-muted-foreground hover:text-primary transition-colors">
                Team
              </Link>
              <Link
                href="/market-fact-sheet"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Market Intelligence
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Desktop Book Consultation Button */}
            <Button
              onClick={scrollToBooking}
              className="hidden md:block bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Book Consultation
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
                <Link
                  href="#team"
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Team
                </Link>
                <Link
                  href="/market-fact-sheet"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Market Intelligence
                </Link>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
                <Button
                  onClick={() => {
                    scrollToBooking()
                    closeMobileMenu()
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                >
                  Book Consultation
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-heading font-black text-5xl md:text-7xl text-foreground mb-4">
            MM Investment Management
          </h1>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-6">
            Shaping Wealth. Securing Legacies.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Where financial expertise meets cutting-edge technology. Transform your investment strategy with Kenya's
            most trusted advisory firm.
          </p>
          <div className="mb-8 flex justify-center">
            <img
              src="/modern-glass-skyscraper-business-district-nairobi-.png"
              alt="Modern business district with corporate skyscrapers"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-lg"
            >
              Start Building Your Legacy
            </Button>
            {/* Market Intelligence CTA Button */}
            <Link href="/market-fact-sheet">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 text-lg bg-transparent"
              >
                View Market Intelligence
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
              About MM Investment Management
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              At MM Investment Management, we are dedicated to guiding distinguished clients through the complexities of
              wealth management and investment strategy. Founded on the principles of excellence, discretion, and
              innovation, we offer tailored advisory solutions designed to preserve wealth, unlock new opportunities,
              and secure enduring legacies.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Our approach blends global financial insights with local market expertise, ensuring strategies that are
              both visionary and practical. By integrating advanced data-driven analysis and cutting-edge technology, we
              deliver clarity in decision-making and precision in execution.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              We serve clients who demand more than standard solutions — individuals and families seeking confidential,
              world-class guidance to grow and safeguard their wealth. With MM Investment Management, every strategy is
              bespoke, every recommendation deliberate, and every outcome aligned with your long-term vision of
              prosperity.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <img
                  src="/modern-office-building-in-nairobi-skyline--profess.png"
                  alt="MM Investment Management office in Nairobi"
                  className="rounded-lg shadow-md mx-auto mb-4"
                />
                <h3 className="font-heading font-semibold text-lg mb-2">Nairobi Headquarters</h3>
                <p className="text-muted-foreground">Strategically positioned in Kenya's financial hub</p>
              </div>
              <div className="text-center">
                <img
                  src="/diverse-group-of-successful-business-professionals.png"
                  alt="Client success and partnership"
                  className="rounded-lg shadow-md mx-auto mb-4"
                />
                <h3 className="font-heading font-semibold text-lg mb-2">Proven Track Record</h3>
                <p className="text-muted-foreground">Delivering exceptional returns for our clients</p>
              </div>
              <div className="text-center">
                <img
                  src="/advanced-financial-technology-dashboard-with-ai-an.png"
                  alt="Technology-driven investment solutions"
                  className="rounded-lg shadow-md mx-auto mb-4"
                />
                <h3 className="font-heading font-semibold text-lg mb-2">Tech Innovation</h3>
                <p className="text-muted-foreground">Cutting-edge tools for superior insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elite financial solutions that transform ambitions into achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading font-semibold">Investment Consultancy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive investment consulting services tailored to your unique financial objectives and risk
                  profile.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading font-semibold">Financial Advisory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Expert guidance on investment strategies and financial planning to maximize your returns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading font-semibold">Investment Portfolio Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Professional management of your investment portfolio with data-driven insights and optimization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading font-semibold">Wealth Planning & Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive wealth planning strategies with robust risk assessment and mitigation techniques.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading font-semibold">Tech-driven Investment Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cutting-edge technology integration for advanced market analysis and investment decision support.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visionary leaders with proven expertise in wealth creation and legacy building
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-32 h-32 mb-6">
                  <img
                    src="/professional-african-businesswoman-headshot--confi.png"
                    alt="Maureen Mukami Kariuki"
                    className="w-full h-full rounded-full object-cover shadow-lg"
                  />
                </div>
                <CardTitle className="font-heading font-semibold text-xl">Maureen Mukami Kariuki</CardTitle>
                <CardDescription className="text-primary font-medium">
                  Co-Founder & Chief Financial Strategist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Maureen is a seasoned financial advisor with over five years of distinguished experience in investment
                  and wealth management. She has served at leading firms such as Madison Investment, where she honed her
                  expertise in delivering bespoke advisory solutions to discerning clients. Holding a Bachelor's degree
                  in Economics, and currently pursuing her Master's in Economics, Maureen combines academic rigor with
                  practical insights. As a Certified Financial Advisor, she is trusted for her ability to craft
                  strategies that preserve and grow wealth, while aligning with her clients' long-term visions. Her
                  leadership embodies excellence, discretion, and an unwavering commitment to client success.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-32 h-32 mb-6">
                  <img
                    src="/professional-african-businessman-headshot--confide.png"
                    alt="Francis Kamau"
                    className="w-full h-full rounded-full object-cover shadow-lg"
                  />
                </div>
                <CardTitle className="font-heading font-semibold text-xl">Francis Kamau</CardTitle>
                <CardDescription className="text-primary font-medium">
                  Co-founder & Chief Technology Officer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Francis is a technology and data specialist with more than five years of impactful experience driving
                  innovation in fast-growing organizations, including Sunking, a global leader in clean energy
                  solutions. He brings a rare blend of technical expertise and strategic foresight, ensuring that MM
                  Investment Management seamlessly integrates cutting-edge technology into investment processes. Francis
                  leverages advanced data analytics, digital platforms, and emerging technologies to provide clients
                  with sharper insights and superior outcomes. His approach reflects the firm's ethos of excellence,
                  precision, and innovation, delivering world-class consultancy that sets new benchmarks in the
                  industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your financial legacy starts with a conversation. Let's discuss how we can shape your wealth together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">Phone</h3>
                  <p className="text-muted-foreground">+254 721 369 509</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">Location</h3>
                  <p className="text-muted-foreground">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="mt-8">
                <img
                  src="/luxury-financial-consultation-meeting--modern-offi.png"
                  alt="Professional consultation environment"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-semibold">Start Your Legacy Journey</CardTitle>
                <CardDescription>Schedule your complimentary consultation today</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" className="w-full" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" className="w-full" />
                  </div>
                  <div>
                    <Textarea placeholder="Tell us about your investment goals" rows={4} className="w-full" />
                  </div>
                  <Button
                    type="button"
                    onClick={scrollToBooking}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Begin Your Journey
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Consultation Section */}
      <section id="booking" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">Book Your Consultation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a personalized consultation with our expert advisors. Choose your preferred date and time for a
              comprehensive discussion about your financial goals.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="font-heading font-semibold text-2xl">Schedule Your Meeting</CardTitle>
              <CardDescription>
                Select your preferred date and time for a one-on-one consultation with MM Investment Management
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">Thank You!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    MM Investment Management will get back to you within 24 hours to confirm your consultation details.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We look forward to helping you shape your wealth and secure your legacy.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <Input name="fullName" placeholder="Enter your full name" className="w-full" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <Input name="phone" type="tel" placeholder="+254 XXX XXX XXX" className="w-full" required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Preferred Date
                      </label>
                      <Input
                        name="preferredDate"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Consultation Type</label>
                    <select
                      name="consultationType"
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      required
                    >
                      <option value="">Select consultation type</option>
                      <option value="investment-consultancy">Investment Consultancy</option>
                      <option value="financial-advisory">Financial Advisory</option>
                      <option value="portfolio-management">Investment Portfolio Management</option>
                      <option value="wealth-planning">Wealth Planning & Risk Management</option>
                      <option value="tech-insights">Tech-driven Investment Insights</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Information (Optional)
                    </label>
                    <Textarea
                      name="additionalInfo"
                      placeholder="Tell us about your current financial situation, investment goals, or any specific questions you'd like to discuss during the consultation..."
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">What to Expect:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 60-minute comprehensive consultation</li>
                      <li>• Personalized investment strategy discussion</li>
                      <li>• Risk assessment and portfolio review</li>
                      <li>• Complimentary financial health check</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Consultation Booking"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 MM Investment Management. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
