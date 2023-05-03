import React, { useCallback } from "react"
import format from "date-fns/format"
import DatePicker from "react-datepicker"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { ChevronRightIcon } from "../../rUI/icons/ChevronRightIcon"
import { ChevronLeftIcon } from "../../rUI/icons/ChevronLeftIcon"

Calendar.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  newDate: PropTypes.instanceOf(Date),
  currentDate: PropTypes.instanceOf(Date),
}

export function Calendar({ minDate, maxDate, newDate, currentDate, ...rest }) {
  const { styles, className, ...pickerProps } = rest

  const getCalendarDateClass = useCallback(
    (date) => {
      const selected = new Date(date)
      return newDate &&
        newDate.getYear() === selected.getYear() &&
        newDate.getMonth() === selected.getMonth() &&
        newDate.getDate() === selected.getDate()
        ? "current"
        : undefined
    },
    [newDate]
  )

  const handleCalendarCustomerHeader = useCallback(
    ({
      date,
      decreaseMonth,
      increaseMonth,
      nextMonthButtonDisabled,
      prevMonthButtonDisabled,
    }) => {
      return (
        <div className="because-calendar__header">
          <div className="because-calendar__header__controller">
            <div
              className={`nav-month-button ${
                prevMonthButtonDisabled ? "disabled" : ""
              }`}
              onClick={() => decreaseMonth()}
            >
              <ChevronRightIcon />
            </div>
            <div className="month">{format(date, "LLLL")}</div>
            <div
              className={`nav-month-button ${
                nextMonthButtonDisabled ? "disabled" : ""
              }`}
              onClick={() => increaseMonth()}
            >
              <ChevronLeftIcon />
            </div>
          </div>
        </div>
      )
    },
    []
  )

  return (
    <StyledCalendarContainer styles={styles} className={className}>
      <DatePicker
        calendarClassName="because-calendar"
        inline
        minDate={minDate}
        maxDate={maxDate}
        openToDate={currentDate} // ?
        selected={currentDate}
        renderCustomHeader={handleCalendarCustomerHeader}
        showDisabledMonthNavigation
        dayClassName={getCalendarDateClass}
        {...pickerProps}
      />
    </StyledCalendarContainer>
  )
}

const StyledCalendarContainer = styled.section`
  .because-calendar {
    font-size: 1.35rem;
    font-weight: bold;
    border-radius: 7px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    width: 368px;
    border: 1px solid rgba(62, 76, 83, 0.64);
    background-color: #ffffff;
    margin-top: 42px;

    @media only screen and (max-width: 550px) {
      font-size: 1.1rem;
      margin: 0 auto;
      border: none;
      padding: 0;
      display: flex;
      justify-content: center;
    }

    @media only screen and (max-width: 450px) {
      width: 95%;
    }

    @media only screen and (max-width: 420px) {
      font-size: 0.95rem;
      width: 100%;
    }

    &__header {
      &__date {
        padding-top: 0;
        padding-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        .text {
          display: flex;
          align-items: center;
          justify-content: center;

          p {
            opacity: 0.77;
            color: #566582;
            font-family: "Graphik Semibold";
            font-size: 13px;
            font-weight: 500;
            line-height: 42px;
            text-transform: uppercase;

            @media only screen and (max-width: 63.9em) {
              line-height: 1;
            }
          }

          .icon {
            margin-right: 20px;
            margin-left: 25px;
            &.calendar {
              font-size: 24px;
              color: #2acabe;
            }
          }

          .date {
            color: #2acabe;
            font-family: "Cooper Lt BT W05 Regular";
            font-size: 20px;
            font-weight: 500;
            line-height: 42px;
            text-transform: initial;
            @media only screen and (max-width: 63.9em) {
              line-height: 1;
            }
          }

          p {
            margin-bottom: 0;
          }
        }

        @media only screen and (max-width: 63.9em) {
          padding-left: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
      }

      &__controller {
        position: relative;
        padding: 20px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:after {
          position: absolute;
          margin: 0 20px;
          left: 0;
          bottom: 0;
          content: "";
          width: calc(100% - 40px);
          height: 1px;
          background-color: #e9f1f1;
        }

        .month {
          color: #566582;
          font-family: "Graphik Medium";
          font-size: 13px;
          font-weight: 500;
          line-height: 42px;
          text-transform: uppercase;
        }

        .nav-month-button {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border: 2px solid #d6dbe5;
          transform: scaleX(-1);
          border-radius: 6px;
          color: #d6dbe5;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background-color: #566582;
            border-color: #566582;
            color: #ffffff;

            & svg {
              fill: #ffffff;
            }
          }

          &.disabled {
            background-color: #d6dbe5;
            border-color: #d6dbe5;
            color: #ffffff;
            cursor: not-allowed;
            pointer-events: none;
          }

          & svg {
            width: 10px;
            height: 10px;
            fill: #d6dbe5;
          }
        }

        i.icon {
          height: 20px;
          font-size: 16px;
          width: 6px;
        }
      }
    }

    .react-datepicker__header {
      padding-top: 0;
      background-color: transparent;
      border: none;
    }

    .react-datepicker__current-month {
      font-size: 1em;
      color: #fff;
    }

    .react-datepicker__navigation {
      top: 1em;
      line-height: 1.7em;
      border: 0.45em solid transparent;
    }

    .react-datepicker__navigation--previous {
      border-right-color: #ccc;
      left: 1em;
    }

    .react-datepicker__navigation--next {
      border-left-color: #ccc;
      right: 1em;
    }

    .react-datepicker__month {
      margin: 0;

      .react-datepicker__week {
        padding: 0px 11px;
        display: flex;
        align-items: center;

        .react-datepicker__day {
          opacity: 0.99;
          color: #566582;
          font-family: "Graphik Medium";
          font-size: 15px;
          font-weight: 500;
          margin: 0;
          padding: 10px 9px;
          flex: 1;
          line-height: 1;
          border: 2px solid transparent;
          border-radius: 7px;
          cursor: pointer;

          @media only screen and (max-width: 550px) {
            padding: 10px;
          }

          &:hover {
            border: 2px solid #6a7b9b;
            background-color: #ffffff;
            color: rgba(85, 85, 85, 0.99);
            border-radius: 50%;
          }

          &--selected {
            border-radius: 100%;
            background-color: #566582;
            color: #ffffff;
          }

          &.current {
            border-radius: 100%;
            background-color: #66efda;
            color: #ffffff;
          }

          &--disabled {
            color: rgba(186, 186, 186, 0.85);

            &:hover {
              border: 2px solid transparent;
              color: rgba(186, 186, 186, 0.85);
            }
          }
        }
      }
    }

    .react-datepicker__day-names {
      padding: 6px 11px 6px 11px;
      display: flex;
      align-items: center;

      .react-datepicker__day-name {
        margin: 0;
        padding: 4px 14px;
        flex: 1;
        width: auto;
        max-width: 14.286%;
        line-height: 1;
        font-size: 13px;
        font-weight: normal;
        color: #757575;
      }
    }
  }

  .because-calendar__header {
    .nav-month-button:not(.disabled) {
      background-color: #667799;
      color: #fff;
      &:hover {
        background-color: #0ae5da;
        border-color: #0ae5da;
      }
    }
  }

  @media screen and (max-width: 550px) {
    .because-calendar {
      font-size: 0.85rem;
      width: 90%;
      margin: auto;
    }
  }
`
