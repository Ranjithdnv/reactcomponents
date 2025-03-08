function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left - Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} Admin Dashboard. All Rights Reserved.
        </p>

        {/* Right - Links */}
        <nav className="flex space-x-4">
          <a href="/privacy-policy" className="hover:text-gray-300 text-sm">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-gray-300 text-sm">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
