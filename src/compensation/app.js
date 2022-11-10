const { reactive, computed, createApp } = Vue; // eslint-disable-line

const inputs = {
  year: {
    key: 'year',
    label: 'Year',
    min: 2016,
    max: new Date().getFullYear(),
  },
  month: {
    key: 'month',
    label: 'Month',
    options: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  public: [
    {
      key: 'hours',
      label: 'Hours per week',
      min: 0,
      max: 40,
      color: 'deep-orange',
    },
    {
      key: 'exec',
      label: 'Exec percentage',
      min: 0,
      max: 100,
      step: 5,
      color: 'deep-orange',
    },
    {
      key: 'responsibility',
      label: 'Responsibility Level',
      min: 1,
      max: 4,
      step: 0.5,
      color: 'green',
    },
  ],
  private: [
    {
      key: 'disability',
      label: 'Disability',
      min: 0,
      max: 10,
      color: 'purple',
    },
    {
      key: 'debt',
      label: 'Debt',
      min: 0,
      max: 10,
      color: 'purple',
    },
    {
      key: 'disadvantage',
      label: 'Disadvantage',
      min: 0,
      max: 10,
      color: 'purple',
    },
  ],
};

function buildInitialFormState(inputs) {
  const initialFormState = {
    year: inputs.year.max,
    month: inputs.month.options[0],
    classification: 'employee',
    hours: 40,
    dependants: [],
  };

  return [...inputs.public, ...inputs.private].reduce((acc, input) => {
    if (!acc[input.key]) {
      acc[input.key] = input.min;
    }
    return acc;
  }, initialFormState);
}

function setup() {
  const form = reactive(buildInitialFormState(inputs));

  const basePay = computed(
    () => 50000 + form.responsibility * 10000 + (form.exec / 100) * 15000
  );

  const yearsOnTeam = computed(() => {
    const month = inputs.month.options.indexOf(form.month);
    const timeOnTeam = new Date() - new Date(form.year, month, 1);
    // - assumes started on first of month (generous)
    // - NOTE Date creator counts months from zero!

    return Math.floor(
      timeOnTeam /
        1000 / // milli-seconds per second
        60 / // seconds per minute
        60 / //  minutes per hour
        24 / // hours per day
        365.24 // days per year
    );
  });

  const effectiveDependants = computed(() => {
    return form.dependants.reduce((acc, dependant) => {
      return acc + 1 / (dependant.supporters + 1);
    }, 0);
  });

  const adjustment = computed(
    () =>
      (form.classification === 'contractor' ? 0.1 : 0) +
      yearsOnTeam.value * 0.03 +
      form.disability * 0.01 +
      form.debt * 0.01 +
      form.disadvantage * 0.01 +
      effectiveDependants.value * 0.05
  );

  const FTEPay = computed(() => basePay.value * (1 + adjustment.value));
  const proRataPay = computed(() => (FTEPay.value * form.hours) / 40);
  const hourlyPay = computed(() => round(FTEPay.value / 2080, 1));

  return {
    inputs,
    form,

    // getters
    yearsOnTeam,
    effectiveDependants,
    adjustment,
    basePay,
    FTEPay,
    proRataPay,
    hourlyPay,

    // helper methods
    markerLabels: (input) => (val) => {
      const largeStep = Math.ceil((input.max - input.min) / 5);
      return {
        label: (val - input.min) % largeStep === 0 ? val : ' ',
      };
    },
    inputRules: (input) => [
      (val) => 'min' in input && val >= input.min,
      (val) => 'max' in input && val <= input.max,
      (val) => {
        const step = input.step || 1;
        return Math.floor(val / step) * step === val;
      },
    ],
    round,

    // actions
    addDependant() {
      const newDependant = form.dependants.length
        ? { ...form.dependants[form.dependants.length - 1] } // copy last entry
        : { supporters: 1 }; // first entry

      form.dependants.push(newDependant);
    },
  };
}

const app = createApp({ setup });
app.use(Quasar); // eslint-disable-line
app.mount('#app');

function round(val, DP = 2) {
  return Math.round(val * 10 ** DP) / 10 ** DP;
}
