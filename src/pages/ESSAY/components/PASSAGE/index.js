import React from "react";

export const Passage = () =>{
    const openTweeter = () =>{
        window.open("https://twitter.com/StephenMuoka6?s=20", "_blank")
    }

    return <div className="space-y-4 xl:space-y-5">
        <p>The quest for a new and better Nigeria has been ongoing for decades, and through it all, the collective efforts of the people have continued to flow like an endless stream, surging through every circumstance and obstacle. The most recent manifestation of this effort was seen on the 25th of February 2023, on the day of the Presidential election, when a chant of voters' count broke out, led by <span className="cursor-pointer" onClick={openTweeter}>@StephenMuoka6</span>.</p>

        <p>
        It was a powerful moment, one that resonated deeply with Nigerians across the country, because every chant carried with it an engulfing reassurance of the hopes and dreams of many Nigerians. It was a moment of unity, a moment when the people came together to demand that their voices be heard and their votes counted. It was a moment when the people stood up and spoke out, refusing to be silenced or marginalized any longer.
        </p>

        <p>We can identify with this moment primarily because it represents the culmination of years of hard work, sacrifice, and determination. It is a testament to the resilience and strength of the Nigerian people, who have endured so much and yet remain committed to the cause of building a better future for themselves and their children. The chant of voters' count is a symbol of that commitment, a sign that the people will not be deterred or discouraged by any obstacle or setback.</p>

        <p>As the count continues, we must all stand together and ensure that the mandate of the people is respected and upheld. We must demand transparency and accountability from our leaders, and we must hold them to the highest standards of integrity and ethics. Only then can we truly build the Nigeria that we all dream of, a Nigeria that is just, fair, and prosperous for all.</p>

        <p>In conclusion, the chant of voters' count that originated from and was led by <span className="cursor-pointer" onClick={openTweeter}>@StephenMuoka6</span> on the 25th of February 2023 is a powerful reminder of the endless stream of collective effort towards a new Nigeria. Let us continue to work together, let us continue to raise our voices and demand change, and let us never give up on our hopes and dreams for a better tomorrow. May the count continue, and may the mandate of the people stand. Elluu P!</p>
    </div>
}