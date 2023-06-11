const About = () => {
  return (
    <div className="flex flex-col w-full">
      <main className="container mx-auto my-8 px-4 w-full">
        <section>
          <h2 className="text-3xl font-bold mb-4">About TravelCare</h2>
          <p className="mb-6">
            TravelCare is a platform designed to help users easily choose their
            next travel destination. Our platform allows users to explore
            different locations, read and write reviews for hotels and
            locations, and book hotel rooms.
          </p>
          <p className="mb-6">With TravelCare, you can:</p>
          <ul className="list-disc list-inside">
            <li>Discover new travel destinations</li>
            <li>Read and write reviews for hotels and locations</li>
            <li>Book hotel rooms</li>
          </ul>
        </section>
      </main>

      <footer className="bg-blue-500 py-4 mt-8">
        <div className="container mx-auto px-4 text-white text-center">
          &copy; 2023 TravelCare. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default About
