const { reactive, computed } = Vue; // eslint-disable-line

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

function round(val, DP = 2) {
  return Math.round(val * 10 ** DP) / 10 ** DP;
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

const template = `
<div>
  <label> Classification </label>
  <div class="q-gutter-x-sm q-ml-sm q-mb-lg">
    <q-radio
      v-model="form.classification"
      val="employee"
      label="Employee"
    />
    <q-radio
      v-model="form.classification"
      val="contractor"
      label="Contractor"
    />
  </div>

  <!-- start year -->
  <label class="q-mb-lg"> Started with company </label>
  <div class="row q-col-gutter-x-md q-mt-sm q-ml-sm">
    <div class="col-3">
      <q-input
        type="number"
        v-model.number="form.year"
        step="1"
        :min="inputs.year.min"
        :max="inputs.year.max"
        :rules="inputRules(inputs.year)"
        dense
        outlined
      >
      </q-input>
    </div>

    <div class="col-4">
      <q-select
        v-model="form.month"
        :options="inputs.month.options"
        dense
        outlined
      >
      </q-select>
    </div>
  </div>
  <div class="q-ml-lg q-mb-lg text-grey-8">
    {{ yearsOnTeam }} years on team
  </div>

  <!-- public + private -->
  <div
    v-for="input in [...inputs.public, ...inputs.private]"
    :key="input.key"
  >
    <label> {{ input.label }} </label>
    <div class="row q-col-gutter-x-lg q-ml-xs q-mb-sm">
      <q-slider
        v-model="form[input.key]"
        :color="input.color"
        markers
        :marker-labels="markerLabels(input)"
        label-always
        :min="input.min"
        :max="input.max"
        :step="input.step || 1"
        class="col-10"
      >
      </q-slider>

      <q-input
        type="number"
        v-model.number="form[input.key]"
        :step="input.step || 1"
        :min="input.min"
        :max="input.max"
        :rules="inputRules(input)"
        outlined
        dense
        class="col-2"
      >
      </q-input>
    </div>
  </div>

  <!-- dependants -->
  <label> Dependants </label>
  <div class="q-mt-xs q-ml-md">
    <div class="row">
      <q-btn
        icon="person_add"
        rounded
        size="sm"
        color="purple"
        @click="addDependant"
        class="col-1 q-mr-sm"
      >
      </q-btn>
      <q-btn
        icon="person_remove"
        rounded
        flat
        size="sm"
        color="grey-7"
        :disabled="form.dependants.length === 0"
        @click="form.dependants.pop()"
        class="col-1"
      >
      </q-btn>
    </div>
    <div>
      <div
        v-for="(dependant, i) in form.dependants"
        :key="i"
        class="q-mt-sm"
      >
        <span class="text-weight-medium"> Dependant {{ i + 1 }}: </span>
        <span>supported by you and </span>
        <q-input
          type="number"
          v-model.number="dependant.supporters"
          :step="1"
          :min="1"
          outlined
          dense
          style="display: inline-block; width: 60px"
          class="q-mx-xs"
        >
        </q-input>
        <span> other people.</span>
      </div>
    </div>

    <div class="q-mt-sm text-grey-8">
      {{ form.dependants.length }} dependants,
      <br />
      {{ round(effectiveDependants) }} effective dependants
    </div>
  </div>

  <!-- total -->
  <q-card flat bordered class="q-mt-lg">
    <q-card-section>
      <div>
        <span class="text-weight-medium">Classification:</span>
        {{ form.classification }}
      </div>
      <div>
        <span class="text-weight-medium">Responsibility level:</span>
        {{ form.responsibility }}
      </div>
      <div>
        <span class="text-weight-medium">Years on team:</span>
        {{ yearsOnTeam }}
      </div>
      <br />
      <div>
        <span class="text-weight-medium">FTE pay:</span>
        \${{ Math.round(FTEPay) }}
      </div>
      <div>
        <span class="text-weight-medium">Hours per week:</span>
        {{ form.hours }}
      </div>

      <!--<div>Adjustment: +{{ Math.floor(adjustment * 100) }}%</div>-->
    </q-card-section>

    <q-card-section>
      <span class="text-h6">
        Salary: \${{ round(proRataPay, 0) }}
      </span>
      <span class="text-body1">
        (hourly: \${{ hourlyPay }})
      </span>
    </q-card-section>
  </q-card>
</div>
`;

export default {
  setup,
  template,
};
