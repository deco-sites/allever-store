import { useEffect, useState } from 'preact/hooks';
import { IS_BROWSER } from "https://deno.land/x/fresh@1.6.8/runtime.ts";

interface CampaignTimerProps {
    expiresAt: string;
    hideLabel?: boolean;
    class?: string;
    onExpire: () => void;
}

const CampaignTimer = ({ expiresAt, onExpire, hideLabel, class: customClass }: CampaignTimerProps) => {
    console.log("CampaignTimer");

    if (!IS_BROWSER) return;

    const parseDate = (dateString: string) => {
        const parsedDate = Date.parse(dateString);
        if (isNaN(parsedDate)) {
            return new Date(dateString).getTime();
        }
        return parsedDate;
    };

    const calculateTimeLeft = () => {
        const expirationTime = parseDate(expiresAt);
        const difference = expirationTime - Date.now();

        return {
            Dias: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
            Horas: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
            Minutos: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
            Segundos: Math.max(Math.floor((difference / 1000) % 60), 0),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [expired, setExpired] = useState(false);
    
    const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
        if (Object.values(timeLeft).every(value => value === 0)) {
            if (!expired) {
                onExpire();
                setExpired(true);
                clearInterval(timer);
            }
            return;
        }
    }, 1000);

    const formatTime = (time: number) => String(time).padStart(2, '0');

    return (
        // "text-xl lg:text-4xl font-bold flex gap-3"

        <div class="flex gap-5 justify-center text-white text-center items-center">
            <div>
                <p class={`${customClass || ''}`}>
                    {formatTime(timeLeft.Dias)} <span>:</span>
                </p>
                {!hideLabel && (
                    <p class="text-base text-start">Dias</p>
                )}
            </div>
            <div>
                   <p class={`${customClass || ''}`}>
                    {formatTime(timeLeft.Horas)} <span>:</span>
                </p>
                {!hideLabel && (
                    <p class="text-base text-start">Horas</p>
                )}
            </div>
            <div>
                   <p class={`${customClass || ''}`}>
                    {formatTime(timeLeft.Minutos)} <span>:</span>
                </p>
                {!hideLabel && (
                    <p class="text-base text-start">Min</p>
                )}
            </div>
            <div>
                   <p class={`${customClass || ''}`}>
                    {formatTime(timeLeft.Segundos)}
                </p>
                {!hideLabel && (
                    <p class="text-base text-start">Seg</p>
                )}
            </div>
        </div>
    );
};

export default CampaignTimer;
