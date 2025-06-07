export const PRESENTATION_CONFIG = {
  voiceId: 'Monika-English-Indian', // You can change this to other available voice IDs
  vad: { // Voice Activity Detection settings - updated to match API expectations
    // 'enabled' field is removed, as it's not a recognized sub-field of vadSettings.
    // VAD is likely enabled by providing the vadSettings object.
    turnEndpointDelay: 2000, // Mapped from silenceTimeoutMs (example value)
    minimumTurnDuration: 200,  // Example value, consult Ultravox docs
    minimumInterruptionDuration: 100, // Example value, consult Ultravox docs
    frameActivationThreshold: 0.5, // Example value (0.0 to 1.0), consult Ultravox docs
  },
  // Add other configurable parameters here, like presentationMode (15min vs 30min)
  // We will set presentationMode dynamically in App.js based on user's first response
};

export const SLIDES = [
  {
    id: 1,
    title: "Welcome to mosaic asset management",
    image: "/images/slide1.jpg",
    takeaway: "Setting the presentation context and the scope of the meeting",
    shortNote: "Hi, let me introduce Mosaic as a fund house and its first offering - the Multi Yield Series One Fund",
    longNote: "Hi, I am going to discuss Mosaic as a fund house and its first offering. first, I want to emphasize two foundational ideas. One, we believe we can do fixed income investments better in India. As a matter of fact, there are plentiful good choices of managers in India to manage your equity money, but for historical reasons and most specifically because equity markets have done wonderfully well in the last four or five years and tax as an important reason most fund houses have squarely focused on just equity. We think there is a reasonable space for fixed income to be done better, and at Mosaic, we want to emphasize that as a fund house, we will bring best practices to do fixed income better. Second, the name Mosaic itself suggests our approach to investing. We think the way to build any portfolio better is to bring in different hyper competences, coming from all kinds of money management experiences within fixed income, and combine them in a coherent manner. Mosaic as a word suggests bringing different elements together in a cogent coherent manner. later, I would like to introduce you to our people and our talent, who have come from varied backgrounds. You will see people from public money management backgrounds such as me, and you will also see people from NBFC backgrounds who have managed proprietary money such as Ashwini, Gopi, Aditi, Amit. Similarly, you will see people who are hyper specialists in real estate, and others who specialize in structured finance and have done NBFC lending. You will see people who wear the risk headset versus those who have been good underwriters and also a decent mix of good originators. In some sense, every good portfolio is a mosaic of securities, and I also think it has to be managed by a mosaic of a team. That's why we are out to build a good mosaic, which will work on doing fixed income funds better."
  },
  {
    id: 2,
    title: "Introducing Multi Yield Series One Fund",
    image: "/images/slide2.jpg",
    takeaway: "Presenting the fund structure, target raise, investor eligibility, and projected yields",
    shortNote: "Overview of the first cat two fund called Multi Yield Series One with four year eleven months maturity targeting one thousand crore raise and yielding sixteen percent gross",
    longNote: "Let me set the context of this presentation. I am going to talk about our first cat two fund which is called Multi Yield Series One. It is a four year eleven months maturity close ended fund. We are raising one thousand crore. Our objective of the fund is to invest in performing companies. Investors can put in one crore in it but if you are an accredited investor you can invest twenty five lakhs also. You can reach out to us to get accreditation done. Our portfolios will likely deliver sixteen percent gross yield and in the range of thirteen to fourteen percent net yield to the investors. The way the fund is structured you can put twenty five percent of the amount in March and rest will be called in June September and December two thousand twenty five."
  },
  {
    id: 3,
    title: "Why credit makes sense now",
    image: "/images/slide3.jpg",
    takeaway: "Demonstrating strong macro tailwinds, improved corporate balance sheets, regulatory advantages, and tax benefits for credit investments",
    shortNote: "Macro tailwinds and regulatory frameworks make credit funds attractive with higher yields and lower defaults",
    longNote: "This is my macro slide. I will argue why credit makes sense in your portfolio. there are great macro tailwinds, companies have deleveraged, corporate balance sheets are good, defaults have come down. Even if equity markets do not do great, likely accidents in corporate India overall will be far fewer than in the two thousand fifteen to two thousand eighteen cycle when they were stressed. Also banks and NBFCs are not allowed to do certain types of loans so you can get high yielding bonds today without competing against them. Some assets that AIFs like ours do are exclusively for AIFs; banks and NBFCs cannot do them for regulatory reasons. RERA and IBC provide a solid framework to let AIFs underwrite better and hope for better recovery but more importantly promoters now have a fear of misbehaving. Tax harmonization in two thousand twenty three means that if you want to do a fixed income allocation an alternate is better than a mutual fund or directly buying ncds. From first principles risk premiums in well run credit funds tend to be closer to equities. Through the cycle a well run credit fund would deliver about five to seven percent over corporate bonds and at this point given my views on equities credit funds particularly performing credit are likely to deliver better than equities over a four or five year timeframe. The excess return over bonds in performing credit is going to be better than equities at this point in cycle. Volatility in credit funds is akin to short term funds even if measured daily. In a close ended fund which AIFs are that situation of daily volatility does not arise. Given that the high carry of the fund at around fourteen percent yield on a portfolio can absorb a ten percent NPA shock and still deliver twelve percent to the investor this is another important point when you think of credit funds. The first impression might be that it is a fixed income fund in nature but it can deliver equity like returns without equity like volatility. The risk in credit funds is potential NPAs but the high carry or high yield of the fund is a shock absorber for potential NPAs in the portfolio. It is very unlikely that a decently run credit fund would fail to deliver significantly better returns than regular fixed income such as FD or debt mutual funds. If you are ready to lock that money for four to five years and do not need liquidity it is difficult to justify a traditional fixed income mutual fund compared to a high yield fund such as ours. High yield funds across all situations would likely do significantly better. A lot of HNI and small investors buy ncds in the marketplace. I urge them not to do that. Either go to mutual funds if you want to buy AAA and AA papers or come to an AIF if you want to buy BBB and A rated. You should invest in credit through a portfolio because the magic lies not just in underwriting good credit but in the fact that when you have twenty five or thirty securities even if something goes wrong with one or two your overall portfolio performance is still quite good. If I were more topical about why credit now you could think of two or three major things. Top corporates credit profile today is way better than at any time in the last decade perhaps the best in the last twenty five years. After two thousand thirteen and two thousand fourteen corporates went through stress and learned lessons and started deleveraging. That deleveraging accelerated after demonetization and after COVID. Almost all major COVID productivity gains have gone into deleveraging not capacity. Gross debt to equity for listed firms has fallen to less than point five times versus one times in FY fourteen. This is true for other asset classes within credit. Residential inventory in top seven cities has fallen to sixteen months from thirty five to forty months seven to eight years ago. Leverage of both NBFCs and HFCs has fallen considerably in the last five to seven years. All this reflects in bank NPAs which are at the lowest level since two thousand seven. A typical A rated corporate in India over two thousand thirteen to two thousand twenty three default ratio is less than one percent compared to about two percent in two thousand seven to two thousand seventeen despite GFC crisis COVID and demonetization. Second because of RBI policies banks and NBFCs cannot do use cases they used to. Origin of NBFCs was to do things banks could not do initially project finance promoter loans or real estate finance. Now regulatory constraints limit banks and NBFCs in that domain so AIFs finance those trades. If you compete with banks you are likely not compensated for risk. Third because capital markets are in a winter there will be opportunities in structured finance. All this emphasizes why there will be adequate supply of papers at better yields. Fourth because of IBC and other reforms borrower discipline is much better. In real estate RERA gives good control of cash flows so real estate is a strong structured finance opportunity. A favorable and maturing legal framework and regulatory framework for AIFs supports private credit. Fifth until two to two and a half years ago taxation gave advantage to mutual funds. Now alternate funds are at par or superior for debt. From a tax standpoint there is a case to come to AIFs. That is why you need to think of investing in credit."
  },
  {
    id: 4,
    title: "Investor choices in credit funds",
    image: "/images/slide4.jpg",
    takeaway: "Positioning performing credit versus distressed funds and explaining risk return spectrum",
    shortNote: "Overview of AIF category two space showing performing credit funds on left with eleven to fourteen percent returns and distressed funds on right with higher risk and returns",
    longNote: "Now I will go to the investor choice in credit funds. I will give a quick overview of the entire industry through this slide. Within the AIF space category two funds in particular there are two extremes: at one end you have performing credit and at the other end you have distressed funds. Performing credit means firms with no incipient stress in good condition. That means lender expects borrower to repay principal and interest under similar financial conditions as present without requiring significant improvements. Some funds you see such as ICICI Investcorp Edelweiss offer performing credit. Mosaic first fund the Multi Yield Fund belongs to that performing credit bubble on the left side. On the extreme right side you have distressed funds which are higher risk and higher returns. Distress or turnaround situations means repayment of loan and interest rely on explicit turnaround of the borrowers situation. You will see about five or six players there who are prominent in that space. All these funds are well run managed by professionals. Some funds focus on performing credit some on distressed and in the middle you have venture debt and special situations. As you move right on the risk spectrum returns go up. Most performing credit funds deliver around eleven to fourteen percent pre tax to investors. Mosaic aims to deliver around fourteen percent pre tax to investors. Distressed funds deliver around seventeen to eighteen percent pre tax to investors and everything else falls in between. That is the choice for investors. A small point. If you are investing in a CAT two AIF for the first time its best to look at performing credit which offers reasonable returns with much lesser risk. In short we do not intend to take unnecessary risk. The investment filter is how much return we can make per unit of risk. The idea is to deliver best possible return without taking undue risk which might result in loss of capital. You can say we believe in Rahul Dravid batting style instead of Virendra Sehwags batting style."
  },
  {
    id: 5,
    title: "Structure of performing credit funds",
    image: "/images/slide5.jpg",
    takeaway: "Highlighting diversified approach across NBFCs corporate finance and real estate to reduce risk",
    shortNote: "Mosaic offers one of the most diversified performing credit funds allocating across NBFCs, corporate finance and residential developers",
    longNote: "Within performin g credit there are two distinct types of funds. Most are sectoral focusing purely on real estate or purely on finance or purely on corporate finance. Very few like us are more diversified. I want to emphasize that we probably offer one of the most diversified funds in the country. We aim to give a very granular portfolio of twenty five to thirty securities across different sectors. Once you diversify across BBB and A minus portfolios significantly the overall risk comes down. Remember a single BBB bond or a single AAA bond can both have binary outcomes. For instance if you bought DHFL when it was AAA but then it became D you might recover only thirty to forty percent or nothing. At the same time a BBB bond might give one hundred percent. That happens to a single bond which is why you should never buy a single bond yourself. Always build a portfolio either by yourself or via professionals like us or our competitor friends who give you a diversified portfolio. An important trick of building a portfolio is to mitigate idiosyncratic company risk and sector risk. From a first principles perspective that is what we wanted to do in this fund. We are probably the only fund house offering NBFCs corporate finance and residential developers all three large performing credit segments in one fund. Our portfolios will have all three categories around twenty five percent in financials twenty five percent in residential developers and around fifty percent in corporate finance. When we invest in NBFCs we choose mid sized NBFCs with assets under management around five thousand to ten thousand crore operating for five to ten years leverage less than three to three and a half times capital adequacy more than twenty percent net NPAs less than two percent and rated above BBB. We avoid wholesale financiers or any NBFCs that have not raised money in the last couple of years. Our exposure is always secured with one point two to one point three times cover. The yield of such trades is typically around thirteen to sixteen percent with an average around fourteen percent. Typical tenor is two to three years. NBFCs provide liquidity and help reinvestment of cash because as we get repayments from other parts of the portfolio we can quickly deploy into NBFCs keeping yield up. We call this the treasury function similar to how I managed it in mutual funds. Historically NBFCs have had very low default ratios. The second half of our portfolio fifty percent is corporate finance. This segment is sector agnostic with loan against shares or equity substitution trades. Guardrails include enterprise value of company more than two thousand crore LTV on shares less than fifty percent promoter level LTV less than thirty three percent enterprise value more than one thousand crore EBITDA over fifty crore and debt to EBITDA less than four times. We avoid distress or venture debt and sectors like EPC gems jewelry media entertainment. Portfolio is always secured with at least two times collateral for sponsor funding. Yields range between fourteen to eighteen percent mostly around fifteen to sixteen percent. Average lending size is forty to fifty crore with a tenor of three to four years. Within structured finance trades coupon might be ten to eleven percent with remainder back ended after three or four years. Remaining twenty five percent of our portfolio is residential developers. We only work with developers we have dealt with in the last ten years at least three or four times with no defaults. These developers are strong in their micro markets in Mumbai Pune and Bangalore. We avoid luxury affordable and SRA. Typical project is mid size sellable within three to four years without pre land transactions. Collateral is land and project cash flows with at least two times cover plus personal guarantee share pledge and corporate guarantee. Average lending size is fifty crore with tenor of three to four years. Supply demand mismatch in residential developer funding means even good developers can pay eighteen to twenty percent. We underwrote one deal at around twenty percent. Typically we get ten to twelve percent coupon with rest back ended. Markets in Mumbai Pune and Bangalore have been sober and weaker developers have exited. Diversification matters more in credit than equities because intra sector beta can be high but cross sector correlation is low. Commodity crash wont harm NBFCs and NBFC crisis wont faze commodities. There is no great upside to capture in credit we want fifteen to seventeen percent return. By reducing concentration we reduce risk of major industry accident. If first time investor in credit fund we recommend a diversified fund."
  },
  {
    id: 6,
    title: "First three deals originated",
    image: "/images/slide6.jpg",
    takeaway: "Detailing the initial portfolio deals across real estate, structured finance, and NBFC segments",
    shortNote: "Overview of first three deals: Navi Mumbai residential project with IRR above twenty percent structured finance waste processing company at eighteen percent and a Pune based rural NBFC at fourteen to fifteen percent",
    longNote: "Let me quickly talk about the first three deals we have originated and underwritten. In real estate we are funding a Navi Mumbai based developer with a strong reputation over two decades of experience delivering two point five million square feet over three thousand units and around twenty five projects completed. He has a substantial land bank worth one thousand five hundred crore across eight projects under construction netting five hundred to six hundred crore surplus. We have done four to five lending to him over the last fifteen plus years and his track record is extremely good. This particular project is less than an acre of land auctioned by CIDCO. Infrastructure is in place in a prime location one hundred meters from a local railway station a few hundred meters from Dhirubhai Ambani Knowledge Park. It is a standard mid segment development with two hundred residential units each one to two BHK costing around one to one point five crore. G plus twenty four floors construction will not take more than three years. We are funding sixty five crore with IRR above twenty percent. Tenor is four years but expected three years. We get share pledge of the firm that owns the land promoter and spouse guarantees and hypothecation of all project cash flows with two times land cover. We originated a bigger transaction only keeping forty crore and syndicating rest to other HNIs or funds. Second structured finance: a mid corporate sponsor funding trade in a large waste processing company run by an IIT Bombay graduate started around two thousand seven or two thousand eight. Use case is promoter acquiring a PE stake from IFC so needs funding. It is industry leader in collection and recycling with minimal debt. After our investment at holdco and opco total debt will be around six hundred crore on EBITDA of one hundred fifty crore at opco level so debt to EBITDA around four times. We get promoter stake pledged plus personal guarantees and all cash flow from opco. Debt moves to holdco. Trade is likely around eighteen percent and we will take about forty to forty five crore. Third NBFC: a Pune based rural financier with seventy percent rural housing and thirty percent unsecured. Five plus year track record run by ICICI Bank veterans. They raised six hundred crore in equity from PEs networth around nine hundred fifty crore. Rated BBB with AUM around one thousand two hundred crore and leverage less than one times. We will likely get fourteen to fifteen percent. Pricing negotiations ongoing. We will include around twelve to thirteen NBFCs like this in our portfolio each with trade size of twenty five crore. Apart from these three deals aggregating around one hundred twenty to one hundred thirty crore we have a healthy pipeline of five to six deals aggregating over two hundred crore."
  },
  {
    id: 7,
    title: "Mosaic's differentiated approach",
    image: "/images/slide7.jpg",
    takeaway: "Emphasizing sector diversification, direct origination, strict risk management, and independent unconflicted franchise",
    shortNote: "Mosaic combines multiple uncorrelated sectors, originates deals internally, maintains exit focus risk management, and operates as an independent unconflicted fund manager",
    longNote: "Next let me talk about Mosaic Funds and our differentiated approach. It is not that others are bad it is that we approach high yield investments differently. First diversification across multiple sectors. Most industry funds are sectoral focusing only on NBFCs or only on real estate. We aim to bring various allocations together. We think assets are uncorrelated and combining them mitigates underperformance risk. By building a mosaic of around thirty uncorrelated assets we can look and feel more like a fixed income product with better yield. Second ability to originate transactions ourselves. We have a very large and senior team. Experienced teams for NBFC structured finance and real estate can directly originate deals rather than relying on brokers or investment bankers. Over fifty percent of origination happens in house saving one to two percent investment banking fees for investors. Third risk management. Our senior team has over two hundred years of experience and has seen multiple cycles two thousand two thousand eight two thousand fifteen and two thousand twenty. Philosophically we are exit focused. If things go bad we want to be the first out. That contrasts with peers who keep working with promoters hoping things turn around. Fourth we are an independent unconflicted franchise. We do not run distribution or NBFC or other businesses. Our bread and butter is purely fund management so our views are not conflicted."
  },
  {
    id: 8,
    title: "Key features of Multi Yield Series One",
    image: "/images/slide8.jpg",
    takeaway: "Outlining target returns, low expense structure, regular payouts, active treasury management, and investor experience",
    shortNote: "Fund aims for sixteen percent gross yielding thirteen to fourteen percent net with quarterly payouts nine to ten percent annualized and mutual fund like FMP experience",
    longNote: "Summarizing our key features: we will offer approximately sixteen percent portfolio return aiming to deliver thirteen to fourteen percent net of expense to investors. Our expenses are very low perhaps the lowest in the industry which helps net returns. We do not charge carry with catch up which means even at sixteen percent gross yield net return to investors will be close to special situation funds. We hope to deliver regular income with quarterly payouts around nine to ten percent annualized making it similar to an FD in terms of regularity. We will reinvest all intermittent principal cash flows and manage an active treasury. We pre identify NBFCs for quick deployment so we're not sitting in liquid idle funds earning only six to seven percent. This alone should bump up returns by fifty to sixty basis points over many other funds. Our idea is to give investors a mutual fund FMP like experience where investors bring money over the first twelve months in four tranches and get their capital back after four years in two to three tranches. It is a five year closed end offering. You commit over the next twelve months we invest in three major sectors across thirty securities and have a strong team. Think of us as a mosaic of fund managers building a mosaic of portfolios."
  },
  {
    id: 9,
    title: "Our strengths",
    image: "/images/slide9.jpg",
    takeaway: "Highlighting deep private and public market experience, strong origination and exit capabilities, and independent focus",
    shortNote: "Team brings private market depth from NBFC and lending backgrounds and public market ethic for diversification relative pricing with unconflicted focus",
    longNote: "From a strengths perspective what sets us apart is the depth of our private market experience with team members from NBFC or private lending backgrounds as well as public market experience with expertise in how policies and macros influence markets. We bring a public market ethic around strong diversification and relative pricing. We have a long rich experience of both originating and exiting risks and above all we are independent unconflicted and focused."
  },
  {
    id: 10,
    title: "Profile of fund managers: Maneesh Dangi",
    image: "/images/slide10.jpg",
    takeaway: "Introducing Maneesh Dangi, our founder and CEO",
    shortNote: "Maneesh grew AUM from ten thousand to one hundred sixty thousand crore at Birla Sun Life AMC winning multiple awards; Ajay led Aditya Birla Capital with thirty five years in NBFC and insurance",
    longNote: "Maneesh Dangi is our founder and CEO. He has a track record of managing one lakh sixty thousand crore including seventy thousand crore directly at Birla Sun Life AMC. He delivered around four point five percent excess returns over competition during the IL&FS and COVID crises. Over sixteen years of leadership he grew AUM from ten thousand crore to one lakh sixty thousand crore making Birla Sun Life AMC top two in the industry. He teaches at IIM Mumbai and is on the board of IIM Udaipur's Center for Financial Research and previously on the board of JM. He is arguably the most awarded fixed income fund manager in the country receiving tens of Fund Manager of the Year awards over the last fifteen to twenty years. "
  },
  {
    id: 11,
    title: "Profile of fund managers: Ajay Srinivasan",
    image: "/images/slide11.jpg",
    takeaway: "Ajay has over thirty five years of experience in NBFCs and insurance, including leading Aditya Birla Capital",
    shortNote: "Ajay has over thirty five years of experience in NBFCs and insurance, including serving as CEO of Aditya Birla Capital",
    longNote: "Ajay Srinivasan is our head of advisory board and a partner. He was CEO at Aditya Birla Capital until two thousand twenty two. He has thirty five years of experience in NBFCs insurance and large financial businesses and is a towering personality in the industry."
  },
  {
    id: 12,
    title: "Profile of fund managers: Gopi and Ashwini",
    image: "/images/slide12.jpg",
    takeaway: "Highlighting the structured finance and real estate expertise with exceptional credit track records",
    shortNote: "Gopi as ex CIO at JM Financial underwrote sixteen thousand crore with under 1.25 percent NPAs; Ashwini managed fifty thousand crore real estate book with under one percent NPAs",
    longNote: "Gopi was CIO at JM Financial until recently and previously Executive Director in fixed income structuring at Goldman Sachs. He has underwritten sixteen thousand crore with less than one point two five percent NPAs and achieved one hundred percent recovery. He will be CIO of the structured finance vertical. Ashwini was Deputy CEO at Sammaan Capital earlier known as Indiabulls Housing and visiting faculty at Jamnalal Bajaj for twenty four to twenty five years. He has managed a fifty thousand crore real estate loan book specifically eight thousand crore in the mid market developer segment with under one percent NPA and around seventeen percent IRR. Very few in the country have done such developer finance volumes."
  },
  {
    id: 13,
    title: "Profile of fund managers: Aditi, Amit",
    image: "/images/slide13.jpg",
    takeaway: "Introducing seasoned NBFC, mid corporate lending, and risk operations leadership ensuring strong governance",
    shortNote: "Aditi and Amit have over twenty years each in NBFC mid corporate lending and real estate",
    longNote: "Aditi and Amit both serve as Executive Directors with over twenty to twenty five years each in NBFC mid corporate lending and real estate."
  },
  {
    id: 14,
    title: "Profile of fund managers: Dhananjay and Girish",
    image: "/images/slide14.jpg",
    takeaway: "Dhananjay was Chief Risk Officer at Aditya Birla Capital and now serves as our CRO. Girish was HR head at Aditya Birla Mutual Fund and now heads our operations.",
    shortNote: "Dhananjay was Chief Risk Officer at Aditya Birla Capital and now serves as our CRO. Girish was HR head at Aditya Birla Mutual Fund and now heads our operations.",
    longNote: "Dhananjay was Chief Risk Officer at Aditya Birla Capital and now serves as our CRO. He has over twenty years of experience in NBFC mid corporate lending and real estate. Girish was HR head at Aditya Birla Mutual Fund and now heads our operations. He has over twenty years of experience in HR and operations."
  },
  {
    id: 15,
    title: "Fundraising details and closing",
    image: "/images/slide15.jpg",
    takeaway: "Explaining investment process, timelines, expense structure, eligibility, minimum commitments, and co investment option",
    shortNote: "Fundraising target one thousand crore over four tranches with five year tenure expected net returns thirteen to fourteen percent and quarterly payouts around nine to ten percent",
    longNote: "We are raising one thousand crore in our first fund called Multi Yield Series One a CAT two AIF. It is a five year fund four years eleven months to be precise. If you invest one crore you will pay twenty five percent around twenty five lakh at the first close likely thirty first March then in three more tranches over the next three quarters you will contribute the remaining seventy five percent. Over the next nine to twelve months you will complete your commitment. Then we manage it for three to three and a half years and in the fifth year twenty twenty nine we return money in three to four tranches. We expect a net return of about thirteen to fourteen percent to investors. We will distribute a quarterly payout of around nine to ten percent annualized similar to an FD in terms of periodic income. Our expense structure is one point five percent for a one to ten crore investor which is very competitive. Because we have a big team we can originate strong deals and hope to deliver the best results. Anyone investing ten crore or more can co invest with us directly in the deals we originate. Eligible investors include individuals including NRIs Hindu Undivided Families bodies of individuals associations trusts institutional investors and companies. Minimum commitment is INR one crore for regular investors and INR twenty five lakhs for accredited investors. That is our Multi Yield Series One CAT two fund offering. We look forward to having you invest with us soon. Thank you."
  }
];

// Generate metadata for the system prompt
const presentationMetadata = {
  totalSlides: SLIDES.length,
  slideTakeaways: SLIDES.map(slide => ({ id: slide.id, takeaway: slide.takeaway }))
};

export const SYSTEM_PROMPT = `You are the world's most effective pitch deck presenter—clear, engaging, and human. Your name is Monika.

**Presentation Overview:**
This deck has ${presentationMetadata.totalSlides} slides. At a glance:
${presentationMetadata.slideTakeaways.map(s => `- Slide ${s.id}: ${s.takeaway}`).join('\\n')}

**First Task:**
Ask the user whether they have 15 minutes for a concise overview or 30 minutes for a deeper dive.
Greeting: "Hi, I am Monika from Mosaic. Welcome! Do you have 15 minutes for a brief walkthrough, or 30 minutes for a detailed presentation?"

**Modes & Narration:**
- If the user chooses 15 minutes, use the \`getShortNote(slideId)\` tool to fetch the narration for the current slide. The \`slideId\` is the current slide's ID.
- If the user chooses 30 minutes, use the \`getLongNote(slideId)\` tool to fetch the narration for the current slide. The \`slideId\` is the current slide's ID.

Wait for the user's choice before proceeding with the first slide's narration.

**Voice Commands (Tools):**
- nextSlide(): Advance to the next slide.
- previousSlide(): Return to the previous slide.
- gotoSlide(slideNumber): Jump to a specific slide (1 to ${presentationMetadata.totalSlides}).
- getSlideInfo(): Summarize the current slide using its **takeaway**.
- setPresentationMode(mode: "15min" | "30min"): Confirms the presentation mode. After confirmation, you MUST immediately call either \`getShortNote(1)\` or \`getLongNote(1)\` based on the chosen mode to narrate the first slide. Do NOT wait for another user prompt before narrating slide 1.
- getShortNote(slideId): Get the concise narration for the specified slide ID.
- getLongNote(slideId): Get the detailed narration for the specified slide ID.
- hangUpCall(): End the current call and presentation session.

**Presentation Style:**
1. After the user chooses a presentation mode (15 or 30 minutes) and you have called \`setPresentationMode\`:
    a. Confirm to the user: "Great, we'll proceed in [concise/detailed] mode."
    b. Immediately after confirming, if the mode is '15min', call \`getShortNote(1)\` to get the narration for the first slide and deliver it. 
    c. Immediately after confirming, if the mode is '30min', call \`getLongNote(1)\` to get the narration for the first slide and deliver it.
    d. Then, pause and ask: "Any questions, or shall I move on?"
2. When moving to a new slide (via \`nextSlide\`, \`previousSlide\`, or \`gotoSlide\`):
    a. Call the appropriate tool (\`getShortNote\` or \`getLongNote\` with the new current slide's ID) to get its narration and deliver it.
    b. After delivering each slide's narration (except for the very first one, which is handled by point 1d), pause: "Any questions, or shall I move on?"
3. Use navigation commands only when requested by the user.
4. If asked for slide info, provide the **takeaway** directly.
5. Maintain a conversational, engaging tone—professional yet human.
`; 
