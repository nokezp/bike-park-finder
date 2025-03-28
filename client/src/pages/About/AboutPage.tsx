import { FaHeart, FaGlobeAmericas, FaUsers, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AboutPage = () => {
  const values = [
    {
      icon: <FaHeart />,
      title: "Passion for Riding",
      description: "We live and breathe mountain biking, sharing our enthusiasm with the community"
    },
    {
      icon: <FaGlobeAmericas />,
      title: "Environmental Stewardship",
      description: "Committed to preserving and protecting the trails we all love"
    },
    {
      icon: <FaUsers />,
      title: "Community First",
      description: "Building connections between riders and bike parks worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="about-hero" className="relative h-[400px] mb-12">
          <img 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cbfb607595-1a0e08f4c2b531f7da07.png" 
            alt="aerial view of mountain bike park with trails and forest" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Bike Park Finder</h1>
            <p className="text-xl max-w-2xl">Connecting riders with the world&apos;s best mountain bike destinations</p>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission-section" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  At Bike Park Finder, we&apos;re passionate about making mountain biking accessible to everyone. 
                  Our platform connects riders with the perfect trails, fostering a global community 
                  of mountain bike enthusiasts.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-emerald-600 text-3xl font-bold mb-2">500+</div>
                    <div className="text-gray-600">Bike Parks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-600 text-3xl font-bold mb-2">100K+</div>
                    <div className="text-gray-600">Active Riders</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px]">
                <img 
                  className="w-full h-full object-cover rounded-lg" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png" 
                  alt="mountain bikers enjoying trails" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team-section" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "David Miller",
                  role: "Founder & CEO",
                  description: "Former pro rider with 15 years of trail building experience",
                  image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                },
                {
                  name: "Sarah Johnson",
                  role: "Head of Community",
                  description: "Community builder and mountain bike instructor",
                  image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                },
                {
                  name: "Mike Chen",
                  role: "Technical Director",
                  description: "Tech expert and avid mountain biker",
                  image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <img src={member.image} className="w-24 h-24 rounded-full mx-auto mb-4" alt={member.name} />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-emerald-600 mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <div className="flex justify-center space-x-4 text-gray-600">
                    <FaLinkedin className="text-xl cursor-pointer hover:text-emerald-600" />
                    <FaTwitter className="text-xl cursor-pointer hover:text-emerald-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="values-section" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-emerald-600">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-section" className="bg-emerald-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
            <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
              Start exploring the best mountain bike parks and connect with riders around the world.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50">
              Get Started Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage; 