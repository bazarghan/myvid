import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./LandingP.scss";

import ChainC from "../../components/chain-c/ChainC";
import BtnC from "../../components/btn-c/BtnC";

const LandingP = () => {
  let navigate = useNavigate();

  const handleClickSignUp = () => {
    navigate("../sign-up", { replace: false });
  };

  const handleClickLogin = () => {
    navigate("../login", { replace: false });
  };

  // useEffect(() => {
  //   let check = localStorage.getItem("user");

  //   if (check) {
  //     navigate("../panel", { replace: true });
  //   }
  // }, []);

  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="landing-p">
      {userIsLoggedIn && <Navigate to="/panel" replace={true} />}

      <div className="landing-p__container-1">
        <div className="landing-p__brand">Moviero</div>

        <div className="landing-p__container-1-1">
          <div className="landing-p__txt-1">ببین</div>

          <ChainC />

          <div className="landing-p__txt-1">ارتباط برقرار کن</div>

          <ChainC />

          <div className="landing-p__txt-1">لذت ببر</div>
        </div>

        <div className="landing-p__container-1-2">
          <div className="landing-p__txt-2">
            موویرو تمام چیزیه که یه فیلمباز احتیاج داره !
          </div>

          <div className="landing-p__txt-3">
            <div className="landing-p__txt-3-1">
              موویرو یه پلتفورم فیلم و سریاله که امکانات مختلفی رو برای عاشقای
              فیلم و سریال فراهم می کنه !
            </div>

            <div className="landing-p__txt-3-2">
              مثلا توش می تونی با دوستات به صورت همزمان هر فیلم و سریالی که می
              خوای رو تماشا کنی
            </div>
          </div>
        </div>

        <div className="landing-p__container-1-3">
          <BtnC
            onClick={handleClickSignUp}
            primary
            className="landing-p__btn--primary"
          >
            ثبت نام
          </BtnC>
          <BtnC
            onClick={handleClickLogin}
            secondary
            className="landing-p__btn--secondary"
          >
            ورود
          </BtnC>
        </div>
      </div>
    </div>
  );
};

export default LandingP;
