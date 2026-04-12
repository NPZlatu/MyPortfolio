<script>
  import { onMount } from 'svelte';
  import '../../global.css';

  let activeTab = 'pswv'; // pswv | partner | documents | timeline | tips
  /** @type {Record<string, boolean>} */
  let checked = {};
  let visaExpiryInput = '';
  let showTimelineLetter = false;
  let showSupportLetter = false;

  onMount(() => {
    try {
      const saved = localStorage.getItem('nz-visa-checked');
      if (saved) checked = JSON.parse(saved);
    } catch (_) {}
  });

  /** @param {string} id */
  function toggle(id) {
    checked[id] = !checked[id];
    checked = { ...checked };
    localStorage.setItem('nz-visa-checked', JSON.stringify(checked));
  }

  /** @param {string[]} ids */
  function resetSection(ids) {
    ids.forEach(id => { checked[id] = false; });
    checked = { ...checked };
    localStorage.setItem('nz-visa-checked', JSON.stringify(checked));
  }

  function resetAll() {
    checked = {};
    localStorage.removeItem('nz-visa-checked');
  }

  /** @param {string[]} ids */
  function progress(ids) {
    const done = ids.filter(id => checked[id]).length;
    return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 };
  }

  // ── Checklists ─────────────────────────────────────────

  const checklistA = [
    { id: 'a1', task: 'Confirm your course completion date with your institution', notes: 'Get a written letter or academic transcript confirming completion of your qualification.' },
    { id: 'a2', task: 'Check your passport validity', notes: 'Must be valid for at least 3 months after you plan to leave NZ. Renew now if needed.' },
    { id: 'a3', task: 'Save NZD $5,000 in YOUR bank account', notes: 'Must be visible in recent bank statements in your name. This is mandatory.' },
    { id: 'a4', task: 'Create / check your RealMe account', notes: 'Go to immigration.govt.nz and log in. You will apply online.' },
    { id: 'a5', task: 'Request police certificates (if needed)', notes: 'From every country you lived in 12+ months in the last 10 years. Must be less than 6 months old. These take weeks—start early.' },
    { id: 'a6', task: 'Book a medical / chest X-ray if needed', notes: 'INZ will tell you after you apply. Use an INZ-approved panel physician.' },
  ];

  const checklistB = [
    { id: 'b1', task: 'Qualification completion letter from your institution', notes: 'Official letter or academic transcript confirming you completed your qualification.' },
    { id: 'b2', task: 'Passport bio page (colour scan)', notes: 'Clear scan of main page with your photo. Enter details EXACTLY as they appear.' },
    { id: 'b3', task: 'Passport-sized photos', notes: 'Colour, taken within last 6 months, JPEG format for upload.' },
    { id: 'b4', task: 'Bank statements showing NZD $5,000+', notes: 'Recent statements in YOUR name. Download as PDF.' },
    { id: 'b5', task: 'Police certificates', notes: 'Only if requested by INZ. Must be less than 6 months old.' },
    { id: 'b6', task: 'Medical certificate / chest X-ray', notes: 'Only if requested by INZ after you apply.' },
    { id: 'b7', task: 'English translations', notes: 'Any document not in English must be translated by a qualified translator meeting INZ requirements.' },
    { id: 'b8', task: 'Application fee: NZD $1,670 ready', notes: 'Visa, Mastercard, Amex, China UnionPay, JCB, or POLi payment.' },
  ];

  const checklistC = [
    { id: 'c1', task: 'Marriage certificate (original or certified copy)', notes: 'If in another language, get a certified English translation.' },
    { id: 'c2', task: 'Joint tenancy / lease agreement', notes: 'Both names on it at the same address. This is KEY.' },
    { id: 'c3', task: 'Utility bills at shared address', notes: 'Power, internet, water bills. Collect from different months to show a pattern.' },
    { id: 'c4', task: 'Joint bank account statements', notes: 'If you have one. Otherwise, individual statements showing the same address help.' },
    { id: 'c5', task: 'Photos together (various times)', notes: 'Different occasions spread over your relationship. Include dates. Max 10MB.' },
    { id: 'c6', task: 'Communication evidence (if ever apart)', notes: 'Screenshots of calls/messages with dates. Show ongoing contact.' },
    { id: 'c7', task: '2–3 support letters from family/friends', notes: 'Each confirms they know you as a couple. Signed, dated, with contact details.' },
    { id: 'c8', task: 'Travel evidence together', notes: 'Flight bookings, hotel receipts, boarding passes with both names.' },
    { id: 'c9', task: "Children's birth certificates (if any)", notes: 'Strong evidence if you have children together.' },
    { id: 'c10', task: 'Relationship Timeline Letter', notes: 'A written letter from both partners explaining your relationship history. THIS IS ESSENTIAL.' },
    { id: 'c11', task: 'Form INZ 1146', notes: 'Completed by the PSWV holder as the supporting partner. Download from INZ website.' },
  ];

  const checklistD = [
    { id: 'd1', task: "Partner's valid passport (bio page scan)", notes: 'Must be valid 3+ months after they plan to leave NZ.' },
    { id: 'd2', task: 'Passport-sized photos', notes: 'Colour, within last 6 months, JPEG format.' },
    { id: 'd3', task: 'Proof of funds: NZD $4,200+', notes: 'Bank statements in their name, or sponsorship evidence.' },
    { id: 'd4', task: 'Police certificates (if requested)', notes: 'From countries they lived 12+ months in the last 10 years. Less than 6 months old.' },
    { id: 'd5', task: 'Medical / chest X-ray (if requested)', notes: 'Required if staying more than 6 months total.' },
    { id: 'd6', task: 'English translations of all non-English docs', notes: 'Must meet INZ translation requirements.' },
    { id: 'd7', task: 'Application fee', notes: 'Varies by nationality. Check INZ website for exact amount.' },
  ];

  const allIds = [...checklistA, ...checklistB, ...checklistC, ...checklistD].map(i => i.id);
  $: overall = progress(allIds);
  $: progA = progress(checklistA.map(i => i.id));
  $: progB = progress(checklistB.map(i => i.id));
  $: progC = progress(checklistC.map(i => i.id));
  $: progD = progress(checklistD.map(i => i.id));

  const pswvSteps = [
    { step: 1, text: 'Go to immigration.govt.nz/visas/post-study-work-visa', link: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/post-study-work-visa' },
    { step: 2, text: "Click 'Apply online' and log in with your RealMe account" },
    { step: 3, text: 'Fill in the application form. Enter all details exactly as they appear on your passport.' },
    { step: 4, text: 'Upload all documents as PDF files (max 10MB each).' },
    { step: 5, text: 'Pay NZD $1,670 and submit.' },
    { step: 6, text: 'Wait for processing (typically 2–5 weeks). Log in to check status. INZ will email if they need more docs.' },
    { step: 7, text: 'If student visa expires while waiting, INZ will normally issue an Interim Visa.' },
  ];

  const partnerSteps = [
    { step: 1, text: 'Wait until the PSWV is granted (or apply at the same time).' },
    { step: 2, text: 'Go to immigration.govt.nz/visas/partner-of-a-worker-work-visa', link: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/partner-of-a-worker-work-visa' },
    { step: 3, text: 'Log in with a RealMe account and fill in the application.' },
    { step: 4, text: 'Upload all relationship evidence + personal documents.' },
    { step: 5, text: 'The PSWV holder attaches the completed Form INZ 1146.' },
    { step: 6, text: 'Pay the fee and submit.' },
    { step: 7, text: 'Wait for processing. INZ may interview both partners or visit your home.' },
  ];

  const folderStructure = [
    {
      folder: 'Folder 1: PSWV APPLICATION',
      files: [
        '01_Passport_Scan.pdf',
        '02_Passport_Photo.jpg',
        '03_Qualification_Completion_Letter.pdf',
        '04_Academic_Transcript.pdf',
        '05_Bank_Statements.pdf',
        '06_Police_Certificate.pdf (if requested)',
        '07_Medical_Certificate.pdf (if requested)',
      ]
    },
    {
      folder: 'Folder 2: PARTNER VISA - Personal Documents',
      files: [
        "01_Partner_Passport_Scan.pdf",
        "02_Partner_Passport_Photo.jpg",
        "03_Partner_Bank_Statements.pdf",
        "04_Partner_Police_Certificate.pdf (if requested)",
        "05_Partner_Medical_Certificate.pdf (if requested)",
        "06_Form_INZ_1146_Partner_Support.pdf",
      ]
    },
    {
      folder: 'Folder 3: PARTNER VISA - Relationship Evidence',
      files: [
        '01_Marriage_Certificate.pdf',
        '02_Relationship_Timeline_Letter_Signed.pdf',
        '03_Tenancy_Agreement.pdf',
        '04_Utility_Bills_Collection.pdf',
        '05_Joint_Bank_Statements.pdf',
        '06_Photos_Together.pdf (15–25 best photos with dates)',
        '07_Support_Letter_Person1.pdf',
        '08_Support_Letter_Person2.pdf',
        '09_Support_Letter_Person3.pdf',
        '10_Travel_Evidence.pdf',
        '11_Communication_Screenshots.pdf (if applicable)',
        "12_Children_Birth_Certificates.pdf (if applicable)",
      ]
    }
  ];

  const timelineRows = [
    { when: 'As soon as possible', tasks: ['Start gathering all documents', 'Open a joint bank account if you don\'t have one', 'Begin collecting relationship evidence (utility bills, photos)', 'Ask friends/family to start writing support letters'] },
    { when: '~2 months before visa expiry', tasks: ['Get qualification completion letter from your institution', 'Ensure NZD $5,000 in your bank account', 'Request police certificates if needed (allow 4–6 weeks)', 'Write your Relationship Timeline Letter', 'Have support letters ready and signed'] },
    { when: '~1 month before visa expiry', tasks: ['Make sure course is officially completed', 'Do a final check of all documents', 'Ensure all PDFs are named and organised'] },
    { when: 'Submit PSWV (within 3 months of expiry)', tasks: ['Submit PSWV application online', 'Have ALL documents ready before starting the form', 'Pay NZD $1,670'] },
    { when: 'While PSWV is processing', tasks: ['If student visa expires before decision, INZ will normally issue Interim Visa', 'Continue preparing partner\'s documents'] },
    { when: 'After PSWV is granted', tasks: ["Submit partner's Partner of Worker Work Visa application", 'Attach all relationship evidence and personal documents', 'PSWV holder completes and attaches Form INZ 1146'] },
  ];

  const mistakes = [
    'Missing the 3-month application deadline after your student visa expires.',
    'Not having NZD $5,000 visible in bank statements at time of application.',
    'Submitting police certificates older than 6 months.',
    'For partner visa: only submitting photos without address-based proof of living together.',
    'Passport details on the form not matching exactly what\'s on the passport.',
    'Not translating non-English documents properly.',
    'Assuming marriage alone is enough proof for the partner visa (it is not).',
    'Waiting until the last minute to request police certificates (they take weeks).',
  ];

  const usefulLinks = [
    { label: 'Post-Study Work Visa (PSWV) Application Page', url: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/post-study-work-visa' },
    { label: 'Partner of Worker Work Visa', url: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/partner-of-a-worker-work-visa' },
    { label: 'Proving Your Partnership — INZ Guide', url: 'https://www.immigration.govt.nz/new-zealand-visas/preparing-a-visa-application/preparing-supporting-documents/prove-partnership' },
    { label: 'Form INZ 1146 — Download', url: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/partner-of-a-worker-work-visa' },
    { label: 'Work Visa Guide INZ 1016 — Download', url: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/post-study-work-visa' },
    { label: 'Partnership-Based Temporary Visa Guide INZ 1199', url: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/partner-of-a-worker-work-visa' },
    { label: 'INZ Contact: 0508 558 855 (NZ) / +64 9 914 4100', url: 'https://www.immigration.govt.nz/about-us/contact-us' },
  ];
</script>

<main class="nz-visa-page">
  <!-- Header -->
  <div class="page-header">
    <a href="/" class="back-link">← Back to portfolio</a>
    <h1>NZ Visa Interactive Checklist & Guide</h1>
    <p class="subtitle">Post-Study Work Visa (PSWV) + Partner of Worker Work Visa. Track your progress, access templates, and stay organised.</p>

    <!-- Overall Progress -->
    <div class="progress-section">
      <div class="progress-stat">
        <div class="big-number">{overall.pct}%</div>
        <div class="progress-label">{overall.done} of {overall.total} items completed</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: {overall.pct}%"></div>
      </div>
      <button class="reset-btn" on:click={resetAll}>Reset all</button>
    </div>
  </div>

  <!-- Tab Navigation -->
  <div class="tabs">
    <button class:active={activeTab === 'pswv'} on:click={() => activeTab = 'pswv'}>Post-Study Work Visa</button>
    <button class:active={activeTab === 'partner'} on:click={() => activeTab = 'partner'}>Partner of Worker Visa</button>
    <button class:active={activeTab === 'documents'} on:click={() => activeTab = 'documents'}>Document Guide</button>
    <button class:active={activeTab === 'timeline'} on:click={() => activeTab = 'timeline'}>Timeline</button>
    <button class:active={activeTab === 'tips'} on:click={() => activeTab = 'tips'}>Tips & Links</button>
  </div>

  <!-- Tab Content -->
  <div class="tab-content">

    <!-- TAB 1: PSWV -->
    {#if activeTab === 'pswv'}
    <div class="tab-pane">
      <div class="overview-card">
        <h2>Your Post-Study Work Visa (PSWV)</h2>
        <div class="facts">
          <p><strong>Application fee:</strong> NZD $1,670 (non-refundable)</p>
          <p><strong>Processing time:</strong> Typically 2–5 weeks (80% within 5 weeks)</p>
          <p><strong>Work rights:</strong> Open work rights = any employer, any job</p>
          <p><strong>Application window:</strong> Within 3 months of your student visa expiry</p>
          <p><strong>Important:</strong> You can only get a PSWV once in your lifetime</p>
        </div>
      </div>

      <!-- Checklist A -->
      <div class="checklist-section">
        <div class="section-header">
          <h3>Checklist A: Preparation</h3>
          <div class="progress-meta">
            <span>{progA.done} of {progA.total}</span>
            <div class="small-bar">
              <div class="small-fill" style="width: {progA.pct}%"></div>
            </div>
          </div>
        </div>
        <div class="checklist-items">
          {#each checklistA as item (item.id)}
            <div class="checklist-item" class:checked={checked[item.id]}>
              <input
                type="checkbox"
                id={item.id}
                checked={checked[item.id]}
                on:change={() => toggle(item.id)}
              />
              <label for={item.id}>
                <span class="task-title">{item.task}</span>
                <span class="task-notes">{item.notes}</span>
              </label>
            </div>
          {/each}
        </div>
        <button class="reset-btn small" on:click={() => resetSection(checklistA.map(i => i.id))}>Reset section</button>
      </div>

      <!-- Checklist B -->
      <div class="checklist-section">
        <div class="section-header">
          <h3>Checklist B: Documents to Gather</h3>
          <div class="progress-meta">
            <span>{progB.done} of {progB.total}</span>
            <div class="small-bar">
              <div class="small-fill" style="width: {progB.pct}%"></div>
            </div>
          </div>
        </div>
        <div class="checklist-items">
          {#each checklistB as item (item.id)}
            <div class="checklist-item" class:checked={checked[item.id]}>
              <input
                type="checkbox"
                id={item.id}
                checked={checked[item.id]}
                on:change={() => toggle(item.id)}
              />
              <label for={item.id}>
                <span class="task-title">{item.task}</span>
                <span class="task-notes">{item.notes}</span>
              </label>
            </div>
          {/each}
        </div>
        <button class="reset-btn small" on:click={() => resetSection(checklistB.map(i => i.id))}>Reset section</button>
      </div>

      <!-- How to Apply -->
      <div class="how-to-section">
        <h3>How to Apply Online (Step by Step)</h3>
        <p>You do NOT need a consultant or immigration adviser. Follow these steps:</p>
        <div class="steps">
          {#each pswvSteps as step}
            <div class="step">
              <div class="step-num">Step {step.step}</div>
              <div class="step-content">
                {#if step.link}
                  <p><a href={step.link} target="_blank" rel="noopener">{step.text}</a></p>
                {:else}
                  <p>{step.text}</p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- INZ Guides -->
      <div class="info-box">
        <h4>Important: Read These Free Guides from INZ</h4>
        <ul>
          <li><strong>Work Visa Guide (INZ 1016)</strong> — Downloadable PDF from the PSWV application page. Official guide that walks you through the full process.</li>
        </ul>
      </div>
    </div>
    {/if}

    <!-- TAB 2: Partner Visa -->
    {#if activeTab === 'partner'}
    <div class="tab-pane">
      <div class="overview-card">
        <h2>Your Partner's Partner of a Worker Work Visa</h2>
        <div class="facts">
          <p><strong>When to apply:</strong> After your PSWV is granted (or at the same time)</p>
          <p><strong>Visa length:</strong> Matches your PSWV duration (up to 3 years)</p>
          <p><strong>Work rights:</strong> Open work rights (any employer, any job)</p>
          <p><strong>Most critical:</strong> INZ needs to see genuine, stable relationship with address-based proof. Even if married, documentary proof is required.</p>
        </div>
      </div>

      <!-- Checklist C -->
      <div class="checklist-section">
        <div class="section-header">
          <h3>Checklist C: Relationship Evidence (Most Important!)</h3>
          <div class="progress-meta">
            <span>{progC.done} of {progC.total}</span>
            <div class="small-bar">
              <div class="small-fill" style="width: {progC.pct}%"></div>
            </div>
          </div>
        </div>
        <p style="margin-bottom: 1.5rem; color: #666; font-size: 0.9rem;">INZ needs to see that your relationship is genuine and stable, and that you live together. This is the most critical part of the partner application.</p>
        <div class="checklist-items">
          {#each checklistC as item (item.id)}
            <div class="checklist-item" class:checked={checked[item.id]}>
              <input
                type="checkbox"
                id={item.id}
                checked={checked[item.id]}
                on:change={() => toggle(item.id)}
              />
              <label for={item.id}>
                <span class="task-title">{item.task}</span>
                <span class="task-notes">{item.notes}</span>
              </label>
            </div>
          {/each}
        </div>
        <button class="reset-btn small" on:click={() => resetSection(checklistC.map(i => i.id))}>Reset section</button>
      </div>

      <!-- Checklist D -->
      <div class="checklist-section">
        <div class="section-header">
          <h3>Checklist D: Partner's Personal Documents</h3>
          <div class="progress-meta">
            <span>{progD.done} of {progD.total}</span>
            <div class="small-bar">
              <div class="small-fill" style="width: {progD.pct}%"></div>
            </div>
          </div>
        </div>
        <div class="checklist-items">
          {#each checklistD as item (item.id)}
            <div class="checklist-item" class:checked={checked[item.id]}>
              <input
                type="checkbox"
                id={item.id}
                checked={checked[item.id]}
                on:change={() => toggle(item.id)}
              />
              <label for={item.id}>
                <span class="task-title">{item.task}</span>
                <span class="task-notes">{item.notes}</span>
              </label>
            </div>
          {/each}
        </div>
        <button class="reset-btn small" on:click={() => resetSection(checklistD.map(i => i.id))}>Reset section</button>
      </div>

      <!-- How She Applies -->
      <div class="how-to-section">
        <h3>How to Apply Online</h3>
        <div class="steps">
          {#each partnerSteps as step}
            <div class="step">
              <div class="step-num">Step {step.step}</div>
              <div class="step-content">
                {#if step.link}
                  <p><a href={step.link} target="_blank" rel="noopener">{step.text}</a></p>
                {:else}
                  <p>{step.text}</p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Templates -->
      <div class="templates-section">
        <h3>Essential Templates</h3>

        <!-- Relationship Timeline Letter -->
        <div class="template-box">
          <button class="template-toggle" on:click={() => showTimelineLetter = !showTimelineLetter}>
            <span>{showTimelineLetter ? '−' : '+'}</span> Relationship Timeline Letter Template
          </button>
          {#if showTimelineLetter}
            <div class="template-content">
              <p style="margin-bottom: 1rem; font-size: 0.9rem; color: #666;"><strong>⚠ Instructions:</strong> Customize this template with your own details. Both partners must sign it. Print, sign by hand, scan, upload as PDF.</p>
              <pre style="background: #f5f5f1; padding: 1.5rem; border-radius: 4px; overflow-x: auto; font-size: 0.85rem; line-height: 1.6;">[Your Full Name]
[Your Address]
[Date]

Immigration New Zealand
PO Box 1473, Wellington 6140

Dear Immigration Officer,

RE: Relationship Timeline in Support of Partner of a Worker Work Visa Application

I, [Your Full Name], passport number [XXXXXXXX], am writing this letter in support of my partner [Partner's Full Name], passport number [XXXXXXXX], who is applying for a Partner of a Worker Work Visa based on our genuine and stable relationship.

HOW WE MET
We first met in [Month, Year] in [City, Country]. [Describe how you met—e.g., through family introduction, at university, at work, through mutual friends]. [Add 2–3 sentences about your first impressions and early interaction.]

DEVELOPMENT OF OUR RELATIONSHIP
[Month, Year]: We began dating / started our relationship.
[Month, Year]: We introduced each other to our families.
[Month, Year]: [Any significant milestone—e.g., got engaged, moved in together].
[Month, Year]: We got married at [Location]. Our marriage was attended by [approximate number] family members and friends.

MOVING TO NEW ZEALAND
[Month, Year]: I received my offer of admission for my studies.
[Month, Year]: I applied for and received my Student Visa.
[Month, Year]: My partner applied for and received their Open Work Visa (Partner of Student).
[Month, Year]: We arrived in New Zealand together / they joined me.

LIVING TOGETHER IN NEW ZEALAND
Since [Month, Year], we have been living together at [Full Address]. We share all household responsibilities including cooking, cleaning, grocery shopping, and paying bills.

Our tenancy agreement is in both our names. We share the following expenses:
- Rent: paid jointly
- Power/electricity: account in [whose name]
- Internet: account in [whose name]
- Groceries: shared expense

FINANCIAL ARRANGEMENTS
We have a joint bank account which we use for shared household expenses. We financially support each other and make important financial decisions together.

SOCIAL LIFE AND SHARED ACTIVITIES
We spend our free time together [describe activities—e.g., exploring the city, visiting friends, cooking together, attending community events]. We have made friends together including [names or description]. We celebrate festivals and occasions together.

FUTURE PLANS
Our plan is to continue living and working together. We are committed to each other and to building our future together in New Zealand. Our relationship is genuine, stable, and exclusive.

I am happy to provide any additional information or attend an interview if required.

Yours sincerely,

_________________________
[Your Full Name]
[Date]

_________________________
[Partner's Full Name]
[Date]</pre>
              <div class="template-tips">
                <p><strong>Tips:</strong></p>
                <ul>
                  <li>Use real dates, places, and names. Be as specific as possible.</li>
                  <li>Both partners must sign the letter by hand.</li>
                  <li>Keep it honest. INZ may interview you separately to verify details.</li>
                  <li>Length: 2–4 pages is ideal. Not too short, not an essay.</li>
                </ul>
              </div>
            </div>
          {/if}
        </div>

        <!-- Support Letter -->
        <div class="template-box">
          <button class="template-toggle" on:click={() => showSupportLetter = !showSupportLetter}>
            <span>{showSupportLetter ? '−' : '+'}</span> Support Letter from Family/Friend Template
          </button>
          {#if showSupportLetter}
            <div class="template-content">
              <p style="margin-bottom: 1rem; font-size: 0.9rem; color: #666;"><strong>⚠ Instructions:</strong> Ask 2–3 people who know you as a couple to write this. Each person writes their own version. They must sign it by hand.</p>
              <pre style="background: #f5f5f1; padding: 1.5rem; border-radius: 4px; overflow-x: auto; font-size: 0.85rem; line-height: 1.6;">[Friend/Family Member's Full Name]
[Their Address]
[Their Phone Number]
[Their Email]
[Date]

To Whom It May Concern,

RE: Support Letter for [Your Name] and [Partner's Name]

My name is [Full Name] and I am a [relationship to you, e.g., friend / cousin / colleague / neighbour] of [Your Name] and [Partner's Name].

I have known [Your Name] since [year] and [Partner's Name] since [year]. I first became aware of their relationship in [year/month] when [describe how you learned about their relationship].

I have personally seen them together on many occasions, including [give 2–3 specific examples, such as dinner at their home, attending a wedding together, helping them move house, celebrating a birthday, etc.].

From what I have seen, their relationship is genuine and caring. They [describe what you observe—e.g., clearly support each other, make decisions together, seem very committed to each other].

I confirm that to the best of my knowledge, they have been living together at [address] since [approximate date].

I am happy to be contacted by Immigration New Zealand if any further information is required.

Yours faithfully,

_________________________
[Full Name]
[Signature]
[Date]</pre>
            </div>
          {/if}
        </div>
      </div>
    </div>
    {/if}

    <!-- TAB 3: Documents -->
    {#if activeTab === 'documents'}
    <div class="tab-pane">
      <h2>Document Organization & Submission Guide</h2>

      <div class="info-box">
        <h3>Key Rules</h3>
        <ul>
          <li><strong>Each document is uploaded SEPARATELY as a PDF</strong> — Do NOT merge everything into one big PDF.</li>
          <li>The INZ online system lets you upload multiple files for each section.</li>
          <li>Each file must be PDF format, max 10MB per file.</li>
          <li>Photos should be in JPEG format (for passport photos) or PDF (for relationship photos).</li>
        </ul>
      </div>

      <div class="info-box">
        <h3>Folder Structure</h3>
        <p>Create folders on your computer to keep everything tidy:</p>
        {#each folderStructure as folder}
          <div style="margin: 1.5rem 0;">
            <p><strong>{folder.folder}</strong></p>
            <ul style="margin-left: 1rem; font-family: monospace; font-size: 0.9rem;">
              {#each folder.files as file}
                <li>{file}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <div class="info-box">
        <h3>Tips for Preparing Documents</h3>
        <ul>
          <li><strong>Scanning:</strong> Use a phone scanning app like Adobe Scan, CamScanner, or Microsoft Lens. These convert photos into clean PDFs.</li>
          <li><strong>File naming:</strong> Name files clearly as shown above. This helps you stay organised and helps INZ find what they need.</li>
          <li><strong>Photos:</strong> Do NOT dump 100 photos. Select 15–25 quality photos from different times. Create a PDF with dates/captions.</li>
          <li><strong>Translations:</strong> Must be done by someone who meets INZ requirements. The translator should include a signed declaration.</li>
          <li><strong>Multiple pages:</strong> If you have many utility bills, combine them into one PDF (most scanning apps can do this). Same for photos.</li>
          <li><strong>Signatures:</strong> For the timeline letter and support letters, print them, sign by hand, then scan back to PDF.</li>
          <li><strong>Do NOT send originals:</strong> Keep your original documents safe. Upload scanned copies only.</li>
        </ul>
      </div>
    </div>
    {/if}

    <!-- TAB 4: Timeline -->
    {#if activeTab === 'timeline'}
    <div class="tab-pane">
      <h2>Action Timeline</h2>
      <p style="margin-bottom: 2rem; color: #666;">Follow this timeline to ensure nothing falls through the cracks. Adjust based on your student visa expiry date.</p>

      <div class="timeline">
        {#each timelineRows as row}
          <div class="timeline-item">
            <div class="timeline-when">{row.when}</div>
            <ul class="timeline-tasks">
              {#each row.tasks as task}
                <li>{task}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <div class="info-box" style="margin-top: 2rem;">
        <h3>Critical Dates</h3>
        <ul>
          <li><strong>Application Window:</strong> Apply for PSWV within 3 months of your student visa expiry.</li>
          <li><strong>Processing Time:</strong> Typically 2–5 weeks for PSWV.</li>
          <li><strong>Police Certificates:</strong> Allow 4–6 weeks—request early!</li>
          <li><strong>Relationship Evidence:</strong> Start gathering early. Utility bills, photos, and support letters take time to organize.</li>
        </ul>
      </div>
    </div>
    {/if}

    <!-- TAB 5: Tips & Links -->
    {#if activeTab === 'tips'}
    <div class="tab-pane">
      <h2>Common Mistakes to Avoid</h2>
      <div class="mistakes-list">
        {#each mistakes as mistake, i}
          <div class="mistake-item">
            <span class="mistake-icon">✗</span>
            <span>{mistake}</span>
          </div>
        {/each}
      </div>

      <h2 style="margin-top: 2.5rem;">Useful Links</h2>
      <div class="links-list">
        {#each usefulLinks as link}
          <a href={link.url} target="_blank" rel="noopener" class="link-item">
            <span class="link-label">{link.label}</span>
            <span class="link-arrow">→</span>
          </a>
        {/each}
      </div>

      <div class="info-box" style="margin-top: 2.5rem;">
        <h3>Need Help?</h3>
        <p>If your situation is complex or you have specific questions, consider consulting a Licensed Immigration Adviser. Immigration rules can change—always check the official INZ website for the latest requirements.</p>
      </div>
    </div>
    {/if}
  </div>

  <!-- Disclaimer -->
  <div class="disclaimer">
    <p><strong>Disclaimer:</strong> This document is for general guidance only and is not immigration advice. Immigration rules can change. Always check the official INZ website for the latest requirements. This guide was created as an interactive tool to help organize your visa application process.</p>
  </div>
</main>

<style>
  :global(body) {
    background-color: var(--bg);
  }

  .nz-visa-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 24px;
    color: var(--text);
  }

  /* ── Header ─────────────────────────────────────────── */

  .back-link {
    display: inline-block;
    margin-bottom: 1.5rem;
    color: var(--accent);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--text);
  }

  .page-header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .subtitle {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .progress-section {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .progress-stat {
    margin-bottom: 1rem;
  }

  .big-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent);
    font-family: var(--font-display);
  }

  .progress-label {
    color: #666;
    font-size: 0.9rem;
  }

  .progress-bar {
    height: 8px;
    background: #e8e8e4;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .progress-fill {
    height: 100%;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  .reset-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text);
    padding: 8px 16px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
  }

  .reset-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .reset-btn.small {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  /* ── Tabs ────────────────────────────────────────────── */

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }

  .tabs button {
    background: none;
    border: none;
    padding: 12px 0;
    margin-bottom: -1px;
    color: #999;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }

  .tabs button:hover {
    color: var(--text);
  }

  .tabs button.active {
    color: var(--text);
    border-bottom-color: var(--accent);
  }

  /* ── Tab Content ────────────────────────────────────── */

  .tab-content {
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .tab-pane {
    padding: 1rem 0;
  }

  .tab-pane h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .tab-pane h3 {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .tab-pane h4 {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }

  /* ── Overview Card ──────────────────────────────────── */

  .overview-card {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    border: 1px solid var(--border);
  }

  .overview-card h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .facts {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .facts p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .facts strong {
    color: var(--accent);
  }

  /* ── Checklist Section ──────────────────────────────── */

  .checklist-section {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    border: 1px solid var(--border);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .section-header h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  .progress-meta {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    white-space: nowrap;
    font-size: 0.85rem;
    color: #666;
  }

  .small-bar {
    width: 100px;
    height: 6px;
    background: #e8e8e4;
    border-radius: 3px;
    overflow: hidden;
  }

  .small-fill {
    height: 100%;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  .checklist-items {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .checklist-item {
    display: flex;
    gap: 0.8rem;
    padding: 0.8rem;
    border-radius: 3px;
    background: transparent;
    transition: background 0.2s;
  }

  .checklist-item:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .checklist-item.checked {
    opacity: 0.6;
  }

  .checklist-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-top: 2px;
    cursor: pointer;
    accent-color: var(--accent);
    flex-shrink: 0;
  }

  .checklist-item label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex: 1;
  }

  .task-title {
    font-weight: 500;
    color: var(--text);
  }

  .checklist-item.checked .task-title {
    text-decoration: line-through;
    color: #999;
  }

  .task-notes {
    font-size: 0.85rem;
    color: #777;
    line-height: 1.4;
  }

  /* ── How-to Section ─────────────────────────────────── */

  .how-to-section {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    border: 1px solid var(--border);
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .step {
    display: flex;
    gap: 1.2rem;
  }

  .step-num {
    min-width: 60px;
    background: var(--accent);
    color: white;
    padding: 8px 12px;
    border-radius: 3px;
    font-weight: 600;
    font-size: 0.85rem;
    text-align: center;
  }

  .step-content {
    flex: 1;
  }

  .step-content p {
    margin: 0;
    line-height: 1.6;
  }

  .step-content a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid var(--accent);
  }

  .step-content a:hover {
    text-decoration: underline;
  }

  /* ── Templates ──────────────────────────────────────── */

  .templates-section {
    margin-top: 2rem;
  }

  .template-box {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .template-toggle {
    width: 100%;
    padding: 1.2rem 1.5rem;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-weight: 500;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    transition: background 0.2s;
  }

  .template-toggle:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .template-toggle span:first-child {
    color: var(--accent);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .template-content {
    padding: 1.5rem;
    border-top: 1px solid var(--border);
  }

  .template-content pre {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .template-tips {
    background: rgba(61, 139, 139, 0.08);
    padding: 1rem;
    border-radius: 3px;
    margin-top: 1rem;
  }

  .template-tips p {
    margin: 0 0 0.5rem 0;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .template-tips ul {
    margin: 0.5rem 0 0 0;
    padding-left: 1.5rem;
  }

  .template-tips li {
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
  }

  /* ── Info Box ────────────────────────────────────────── */

  .info-box {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    border: 1px solid var(--border);
  }

  .info-box h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .info-box ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .info-box li {
    margin-bottom: 0.6rem;
    line-height: 1.6;
  }

  /* ── Timeline ────────────────────────────────────────── */

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .timeline-item {
    padding-left: 2rem;
    border-left: 3px solid var(--accent);
    position: relative;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
  }

  .timeline-when {
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.5rem;
  }

  .timeline-tasks {
    margin: 0;
    padding-left: 1.5rem;
    font-size: 0.95rem;
  }

  .timeline-tasks li {
    margin-bottom: 0.4rem;
  }

  /* ── Mistakes List ───────────────────────────────────── */

  .mistakes-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .mistake-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-card);
    border-radius: 3px;
    border-left: 3px solid #d32f2f;
  }

  .mistake-icon {
    color: #d32f2f;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  /* ── Links List ──────────────────────────────────────── */

  .links-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .link-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.2rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text);
    text-decoration: none;
    transition: all 0.2s;
  }

  .link-item:hover {
    background: rgba(61, 139, 139, 0.05);
    border-color: var(--accent);
  }

  .link-label {
    font-weight: 500;
    font-size: 0.95rem;
  }

  .link-arrow {
    color: var(--accent);
    font-weight: 700;
  }

  /* ── Disclaimer ─────────────────────────────────────── */

  .disclaimer {
    background: #fff9f0;
    border: 1px solid #ffe0c9;
    padding: 1.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #5d4037;
    line-height: 1.6;
    margin-top: 3rem;
  }

  .disclaimer p {
    margin: 0;
  }

  /* ── Print Styles ───────────────────────────────────── */

  @media print {
    .tabs,
    .back-link,
    .reset-btn,
    .template-toggle,
    .page-header .progress-section {
      display: none !important;
    }

    .tab-pane {
      page-break-inside: avoid;
    }

    .checklist-section,
    .how-to-section,
    .info-box {
      page-break-inside: avoid;
    }
  }

  /* ── Responsive ─────────────────────────────────────── */

  @media (max-width: 640px) {
    .nz-visa-page {
      padding: 24px 16px;
    }

    .page-header h1 {
      font-size: 1.5rem;
    }

    .tabs {
      gap: 0.5rem;
    }

    .tabs button {
      padding: 10px 0;
      font-size: 0.75rem;
    }

    .section-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .progress-meta {
      width: 100%;
    }

    .big-number {
      font-size: 2rem;
    }
  }
</style>
