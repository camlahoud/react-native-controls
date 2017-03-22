import DatePickerInternal from './lib/date-picker';
import TimeRangePickerInternal from './lib/timerange-picker';
import MultiSelectInternal from './lib/multi-select';
import SelectListInternal from './lib/select-list';
import SpacedTextInternal from './lib/spacedtext';

const Controls = {
    DatePicker: DatePickerInternal,
    TimeRangePicker: TimeRangePickerInternal,
    MultiSelect: MultiSelectInternal,
    SelectList: SelectListInternal,
    SpacedText: SpacedTextInternal,
};

export default Controls;
export const DatePicker = DatePickerInternal;
export const TimeRangePicker = TimeRangePickerInternal;
export const MultiSelect = MultiSelectInternal;
export const SelectList = SelectListInternal;
export const SpacedText = SpacedTextInternal;