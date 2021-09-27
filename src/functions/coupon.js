import axios from "axios";

// * GET ALL COUPONS
export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

// * DELETE COUPONS
export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

// * CREATE COUPONS
export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
