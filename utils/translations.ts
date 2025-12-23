import { Language } from '../types';

export const translations = {
  en: {
    header: {
      title: 'CONTROL PANEL',
      subtitle: 'ROSKOMNADZOR // FIREWALL_V.9.0',
      monitor: 'NETWORK MONITORING ACTIVE',
    },
    input: {
      placeholder: 'ENTER PROTOCOL NAME (E.G. TELEGRAM)...',
      button: 'INJECT',
      system: 'System: Waiting for input...',
      loading: 'RESOLVING...',
    },
    card: {
      active: 'ACTIVE',
      blocked: 'BLOCKED',
      delete: 'PURGE',
    },
    status: {
      noProtocols: 'NO PROTOCOLS DETECTED',
      online: 'System Status: ONLINE',
      secured: 'Secured by RKN-CORE',
      latency: 'Latency: 12ms',
    },
    modal: {
      title: 'PROTOCOL DELETION SEQUENCE',
      step1_title: 'INITIALIZING PURGE...',
      step1_desc: 'Allocating server resources for permanent record expungement.',
      step2_title: 'COMPLIANCE CHECK',
      step2_desc: 'Required by Federal Law 27-B regarding digital asset forfeiture.',
      check1: 'I confirm that this action is irreversible and recorded.',
      check2: 'I acknowledge that I am authorized to modify the firewall.',
      check3: 'I accept full liability for any network instability.',
      step3_title: 'SYNCHRONIZING...',
      step3_desc: 'Contacting Central Archives. Please wait for queue position.',
      step4_title: 'FINAL AUTHORIZATION',
      step4_desc: 'Press and hold effectively (just click) to execute.',
      cancel: 'ABORT',
      next: 'PROCEED',
      confirm: 'EXECUTE PURGE',
      wait: 'WAIT...',
    }
  },
  ru: {
    header: {
      title: 'ПАНЕЛЬ УПРАВЛЕНИЯ',
      subtitle: 'РОСКОМНАДЗОР // FIREWALL_V.9.0',
      monitor: 'МОНИТОРИНГ СЕТИ АКТИВЕН',
    },
    input: {
      placeholder: 'ВВЕДИТЕ ИМЯ ПРОТОКОЛА (НАПР. TELEGRAM)...',
      button: 'ВНЕДРИТЬ',
      system: 'Система: Ожидание ввода...',
      loading: 'ОБРАБОТКА...',
    },
    card: {
      active: 'АКТИВЕН',
      blocked: 'ЗАБЛОКИРОВАНО',
      delete: 'УДАЛИТЬ',
    },
    status: {
      noProtocols: 'ПРОТОКОЛЫ НЕ ОБНАРУЖЕНЫ',
      online: 'Статус системы: ОНЛАЙН',
      secured: 'Защищено RKN-CORE',
      latency: 'Задержка: 12мс',
    },
    modal: {
      title: 'ПРОЦЕДУРА УДАЛЕНИЯ',
      step1_title: 'ИНИЦИАЛИЗАЦИЯ...',
      step1_desc: 'Выделение ресурсов сервера для удаления записи из реестра.',
      step2_title: 'ПРОВЕРКА СООТВЕТСТВИЯ',
      step2_desc: 'Требуется согласно ФЗ-27-Б об изъятии цифровых активов.',
      check1: 'Я подтверждаю, что действие необратимо и заносится в лог.',
      check2: 'Я подтверждаю наличие полномочий на изменение фаервола.',
      check3: 'Я принимаю полную ответственность за нестабильность сети.',
      step3_title: 'СИНХРОНИЗАЦИЯ...',
      step3_desc: 'Связь с Центральным Архивом. Ожидайте очереди.',
      step4_title: 'ФИНАЛЬНАЯ АВТОРИЗАЦИЯ',
      step4_desc: 'Подтвердите выполнение операции.',
      cancel: 'ОТМЕНА',
      next: 'ДАЛЕЕ',
      confirm: 'ВЫПОЛНИТЬ',
      wait: 'ЖДИТЕ...',
    }
  }
};