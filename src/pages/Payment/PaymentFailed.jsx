const PaymentFailed = ({ retry }) => {
  return (
    <div className="p-10 text-center text-red-600">
      <h1 className="text-3xl font-bold">Payment Failed ❌</h1>

      <button
        onClick={retry}
        className="mt-4 bg-black text-white px-4 py-2"
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentFailed;