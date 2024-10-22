import { useScript } from "@deco/deco/hooks";

interface CampaignTimerProps {
  id: string;
  expiresAt: string;
  hideLabel?: boolean;
}

const onLoad = (
  id: string,
  expiresAt: string,
) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiresAt) - +new Date();
    const container = document.getElementById(id);
    if (!container) return;
    const days = Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0);
    const hours = Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0);
    const minutes = Math.max(Math.floor((difference / 1000 / 60) % 60), 0);
    const seconds = Math.max(Math.floor((difference / 1000) % 60), 0);
    // if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) {
    //   container.classList.remove("hidden");
    // } else {
    //   container.classList.add("hidden");
    // }
    container.querySelector("#days #value")!.innerHTML = formatTime(days);
    container.querySelector("#hours #value")!.innerHTML = formatTime(hours);
    container.querySelector("#minutes #value")!.innerHTML = formatTime(minutes);
    container.querySelector("#seconds #value")!.innerHTML = formatTime(seconds);
  };

  const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
  };

  setInterval(calculateTimeLeft, 1000);
};

const CampaignTimer = ({
  id,
  expiresAt,
}: CampaignTimerProps) => {
  return (
    <>
      <div class="flex gap-5 justify-center text-white text-center items-center">
        <div>
          <p id="days" class="text-xl lg:text-4xl font-bold flex gap-3">
            <span id="value" />
            <span>:</span>
          </p>
        </div>
        <div>
          <p id="hours" class="text-xl lg:text-4xl font-bold flex gap-3">
            <span id="value" />
            <span>:</span>
          </p>
        </div>
        <div>
          <p id="minutes" class="text-xl lg:text-4xl font-bold flex gap-3">
            <span id="value" />
            <span>:</span>
          </p>
        </div>
        <div>
          <p id="seconds" class="text-xl lg:text-4xl font-bold flex gap-3">
            <span id="value" />
          </p>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, id, expiresAt),
        }}
      />
    </>
  );
};

export default CampaignTimer;
