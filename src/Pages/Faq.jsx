const Faq = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Q:</strong> How do I sign up?
        </p>
        <p>
          <strong>A:</strong> Click the "Sign Up" link at the top of the page and
          complete the registration form.
        </p>
        <p>
          <strong>Q:</strong> Where can I view market prices?
        </p>
        <p>
          <strong>A:</strong> Use the "All Products" section or search on the
          home page to browse current prices.
        </p>
        {/* Add more questions and answers as needed */}
      </div>
    </div>
  );
};

export default Faq;
