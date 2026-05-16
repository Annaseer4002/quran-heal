export function Footer() {
  return (
    <footer className="mt-15 py-10 border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* App Branding/Mission */}
        <p className="text-white font-semibold mb-2">
          Spiritual First-Aid
        </p>
        
        {/* Acknowledgement */}
        <p className="text-gray-500 text-sm mb-4">
          An open-source project built for the Provision Launch Hackathon. 
          Data sourced from the <a href="https://quran.com" className="underline">Quran Foundation</a>.
        </p>

        {/* The Crucial Disclaimer */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-400 text-xs leading-relaxed italic">
            Disclaimer: This tool is intended for spiritual reflection and educational purposes only. 
            It does not provide clinical mental health advice or definitive religious guidance. 
            Please consult with qualified professionals for medical or religious concerns.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-xs mt-6">
          © {new Date().getFullYear()} — Built with ❤️ for the Ummah.
        </p>
      </div>
    </footer>
  );
}