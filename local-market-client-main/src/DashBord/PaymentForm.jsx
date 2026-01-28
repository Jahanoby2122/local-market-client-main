import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuth from "../Hooks/UseAuth";
import { toast } from "react-toastify";
import {
  FiLock,
  FiShoppingBag,
  FiUser,
  FiMail,
  FiDollarSign,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
  FiCreditCard,
  FiPackage,
  FiCalendar,
  FiArrowRight,
  FiShoppingCart,
  FiTruck
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

// FiLeaf is not available in react-icons/fi, so we'll use alternatives
// You can also import from other icon sets if needed:
import { MdLocalGroceryStore, MdLocalFlorist, MdGrass } from "react-icons/md";
import { GiFruitBowl, GiPlantWatering } from "react-icons/gi";
import { FaLeaf, FaAppleAlt, FaCarrot } from "react-icons/fa";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const { isLoading, data: ProductInfo = {} } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (ProductInfo?.pricePerUnit) {
      axiosSecure
        .post("/create-payment-intent", { price: ProductInfo.pricePerUnit })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => toast.error("Failed to initialize payment"));
    }
  }, [ProductInfo, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    if (!stripe || !elements) return setProcessing(false);

    const card = elements.getElement(CardElement);
    if (!card) return setProcessing(false);

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      toast.error(methodError.message);
      return setProcessing(false);
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Customer",
            email: user?.email || "customer@example.com",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      toast.error(confirmError.message);
      return setProcessing(false);
    }

    if (paymentIntent.status === "succeeded") {
      setPaymentCompleted(true);
      toast.success("✅ Payment successful!");

      const orderData = {
        userEmail: user?.email,
        productId: id,
        itemName: ProductInfo.itemName,
        marketName: ProductInfo.marketName,
        productName: ProductInfo.name,
        price: ProductInfo.pricePerUnit,
        transactionId: paymentIntent.id,
        status: "paid",
        orderTime: new Date().toISOString(),
      };

      try {
        await axiosSecure.post("/orders", orderData);
        toast.success("✅ Order placed successfully!");
      } catch {
        toast.error("Payment success but order save failed");
      }
    }

    setProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/50 to-emerald-50/50 px-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-200/50 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-gray-700 font-medium">Loading fresh produce details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-emerald-50/30 to-amber-50/30 px-4 py-8 md:py-12">
      {/* Market Header with Fresh Produce Theme */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <FiShoppingCart className="text-white text-xl" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                <FaLeaf className="text-white text-xs" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">KachaBazar</h1>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#795548] mb-2">Secure Checkout</h2>
            <p className="text-gray-700">Fresh from market to your doorstep</p>
          </div>
          
          {/* Progress Steps with Market Colors */}
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10"></div>
              <div 
                className="absolute top-4 left-0 h-1 bg-gradient-to-r from-[#2E7D32] to-[#FF9800] -z-10 transition-all duration-500"
                style={{ width: paymentCompleted ? '100%' : '33%' }}
              ></div>
              
              {['Order', 'Payment', 'Complete'].map((step, index) => (
                <div key={step} className="flex flex-col items-center relative">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center 
                    ${paymentCompleted ? 'bg-[#2E7D32]' : index === 0 ? 'bg-[#2E7D32]' : index === 1 && !paymentCompleted ? 'bg-[#FF9800]' : 'bg-gray-300'}
                    transition-all duration-300
                  `}>
                    {paymentCompleted && index === 2 ? (
                      <FiCheckCircle className="text-white text-sm" />
                    ) : (
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    )}
                  </div>
                  <span className={`
                    text-xs font-medium mt-2
                    ${paymentCompleted ? 'text-[#2E7D32]' : index === 0 ? 'text-[#2E7D32]' : index === 1 && !paymentCompleted ? 'text-[#FF9800]' : 'text-gray-500'}
                  `}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT – ORDER SUMMARY with Market Theme */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-green-500 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <h2 className="text-xl font-bold text-white flex items-center relative z-10">
                <div className="mr-3 bg-white/20 p-2 rounded-lg">
                  <FiShoppingBag className="text-white" />
                </div>
                Fresh Produce Order
              </h2>
              <p className="text-white/90 mt-2 text-sm relative z-10">Direct from local markets</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Product Card with Market Style */}
              <div className="border border-amber-100 rounded-xl p-4 bg-gradient-to-r from-amber-50/50 to-emerald-50/50">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF9800]/20 to-[#2E7D32]/20 flex items-center justify-center">
                    <FiPackage className="text-[#795548] text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{ProductInfo.itemName}</h3>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-[#2E7D32] rounded-full mr-2"></div>
                          <p className="text-gray-600 text-sm">{ProductInfo.marketName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF3E0]">
                          <span className="text-sm font-medium text-[#8B4513]">Fresh Stock</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-white/50 rounded-lg border border-amber-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-[#FF9800]/10 flex items-center justify-center mr-3">
                            <FiDollarSign className="text-[#FF9800]" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Price per Unit</p>
                            <p className="font-bold text-[#795548]">${ProductInfo.pricePerUnit}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-white/50 rounded-lg border border-emerald-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center mr-3">
                            <FiTruck className="text-[#2E7D32]" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Delivery</p>
                            <p className="font-medium text-[#2E7D32]">Next Day</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white">
                <h4 className="font-semibold text-gray-900 flex items-center mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#8B4513]/10 flex items-center justify-center mr-3">
                    <FiUser className="text-[#8B4513]" />
                  </div>
                  Customer Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-emerald-100 flex items-center justify-center mr-3">
                        <FiUser className="text-[#795548]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Customer Name</p>
                        <p className="font-medium text-gray-900">{user?.displayName || "Guest User"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-emerald-100 flex items-center justify-center mr-3">
                        <FiMail className="text-[#795548]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="font-medium text-gray-900">{user?.email || "customer@example.com"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Guarantee */}
              <div className="bg-gradient-to-r from-emerald-50/80 to-amber-50/80 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mr-4">
                    <FaLeaf className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Market Fresh Guarantee</h4>
                    <p className="text-sm text-gray-700">
                      Your produce is sourced directly from verified local markets. We guarantee freshness and quality with next-day delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Section */}
            <div className="border-t border-amber-100 p-6 bg-gradient-to-r from-amber-50/30 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-medium">Total Amount</p>
                  <p className="text-sm text-gray-500">Includes all market fees & taxes</p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-[#8B4513]">${ProductInfo.pricePerUnit}</span>
                    <span className="text-sm text-gray-500 ml-2">USD</span>
                  </div>
                  <div className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-[#2E7D32]/10">
                    <span className="text-xs font-medium text-[#2E7D32]">Local Market Price</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT – PAYMENT FORM */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Payment Header */}
              <div className="bg-green-500 p-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <div className="mr-3 bg-white/20 p-2 rounded-lg">
                    <FiLock className="text-white" />
                  </div>
                  Secure Payment
                </h2>
              </div>

              <div className="p-6">
                {paymentCompleted ? (
                  <div className="text-center py-8">
                    <div className="relative mx-auto mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <FiCheckCircle className="text-white text-3xl" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center animate-bounce">
                        <FaLeaf className="text-white text-xs" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2E7D32] mb-2">Order Confirmed!</h3>
                    <p className="text-gray-600 mb-6">Your fresh produce is being prepared for delivery.</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="w-full py-3 bg-gradient-to-r from-[#FF9800] to-[#FB8C00] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Shop More Fresh Produce
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">
                          Card Details
                        </label>
                        <div className="flex space-x-1">
                          {['VISA', 'MC', 'AMEX'].map((card) => (
                            <div key={card} className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-600">{card.charAt(0)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-2 border-gray-300 rounded-xl p-4 bg-gray-50 hover:border-[#795548] transition-colors duration-200">
                        <CardElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#4A4A4A",
                                fontFamily: '"Inter", -apple-system, sans-serif',
                                fontWeight: "500",
                                "::placeholder": {
                                  color: "#A8A8A8",
                                  fontWeight: "400",
                                },
                              },
                              invalid: {
                                color: "#D32F2F",
                              },
                            },
                            hidePostalCode: true,
                          }}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                        <div className="flex items-center text-red-700">
                          <FiAlertCircle className="mr-3 flex-shrink-0" />
                          <span className="font-medium text-sm">{error}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!stripe || !clientSecret || processing || paymentCompleted}
                      className={`
                        w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                        relative overflow-hidden group
                        ${processing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : paymentCompleted
                          ? 'bg-emerald-600 cursor-default'
                          : 'bg-green-500 via-[#2E7D32] to-[#FF9800] hover:shadow-xl text-white'
                        }
                      `}
                    >
                      <div className="absolute inset-0 bg-green-500 via-[#2E7D32] to-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center justify-center space-x-3">
                        {processing ? (
                          <>
                            <FiLoader className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : paymentCompleted ? (
                          <>
                            <FiCheckCircle />
                            <span>Completed</span>
                          </>
                        ) : (
                          <>
                            <span>Pay ${ProductInfo.pricePerUnit}</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>

                    <div className="text-center pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-[#795548]">KachaBazar</span> guarantees secure transactions with 256-bit encryption
                      </p>
                    </div>
                  </form>
                )}

                {/* Security & Support */}
                <div className="mt-8 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50/50 rounded-lg p-3 text-center border border-gray-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiShield className="text-emerald-600" />
                      </div>
                      <p className="text-xs text-gray-600">Secure Payment</p>
                    </div>
                    <div className="bg-gray-50/50 rounded-lg p-3 text-center border border-gray-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiTruck className="text-amber-600" />
                      </div>
                      <p className="text-xs text-gray-600">Fresh Delivery</p>
                    </div>
                  </div>

                  {/* Market Support */}
                  <div className="bg-gradient-to-r from-amber-50/50 to-emerald-50/50 rounded-xl p-4 border border-amber-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9800]/20 to-[#FF9800]/40 flex items-center justify-center mr-3">
                        <FiAlertCircle className="text-[#FF9800]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Market Support</h4>
                        <p className="text-xs text-gray-600 mt-1">Need help? Call +1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-8 text-center">
        <p className="text-sm text-gray-500">
          KachaBazar - Bringing fresh produce from local markets to your home since 2024
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;