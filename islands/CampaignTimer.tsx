import { useEffect, useState } from "preact/hooks";

interface CampaignTimerProps {
  expiresAt: string;
  hideLabel?: boolean;
  onExpire: () => void;
}

const CampaignTimer = (
  { expiresAt, onExpire, hideLabel }: CampaignTimerProps,
) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiresAt) - +new Date();
    return {
      Dias: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
      Horas: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      Minutos: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
      Segundos: Math.max(Math.floor((difference / 1000) % 60), 0),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (Object.values(timeLeft).every((value) => value === 0)) {
      if (!expired) {
        onExpire();
        setExpired(true);
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, expired]);

  const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
  };

  return (
    <div class="flex gap-5 justify-center text-white text-center items-center my-4 lg:mb-0">
      <div>
        <p class="text-xl lg:text-4xl font-bold flex gap-3">
          {formatTime(timeLeft.Dias)} <span>:</span>
        </p>
        {hideLabel ? <p class="text-xs lg:text-sm">Dias</p> : null}
      </div>
      <div>
        <p class="text-xl lg:text-4xl font-bold flex gap-3">
          {formatTime(timeLeft.Horas)} <span>:</span>
        </p>
        {hideLabel ? <p class="text-xs lg:text-sm">Horas</p> : null}
      </div>
      <div>
        <p class="text-xl lg:text-4xl font-bold flex gap-3">
          {formatTime(timeLeft.Minutos)} <span>:</span>
        </p>
        {hideLabel ? <p class="text-xs lg:text-sm">Min</p> : null}
      </div>
      <div>
        <p class="text-xl lg:text-4xl font-bold flex gap-3">
          {formatTime(timeLeft.Segundos)}
        </p>
        {hideLabel ? <p class="text-xs lg:text-sm">Seg</p> : null}
      </div>
    </div>
  );
};

export default CampaignTimer;
