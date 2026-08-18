// ==UserScript==
// @name           ChasterTranslator
// @namespace      chaster_translator
// @version        0.3
// @description    Chaster Translator Simplified Chinese
// @description:zh Chaster 中文翻译
// @author         HBcao
// @match          https://*.chaster.app*
// @icon           https://www.google.com/s2/favicons?sz=64&domain=chaster.app
// @grant          none
// @license        MIT
// @downloadURL    https://update.greasyfork.org/scripts/470690/Chaster%20Translator%20zh-cn.user.js
// @updateURL      https://update.greasyfork.org/scripts/470690/Chaster%20Translator%20zh-cn.meta.js
// ==/UserScript==

(function () {
  'use strict';

  function forTextNode(node, func) {
    node.childNodes.forEach((c) => {
      if (c.nodeType === Node.TEXT_NODE) {
        func?.(c);
      }
    });
  }

  function translate_loading(node) {
    const caption = node.querySelector('.caption');
    caption.innerText = caption.innerText
      .replace('Loading...', '加载中...')
      .replace('Loading settings...', '加载设置...')
      .replace('Loading profile...', '加载头像...');
  }

  function translate_bottom_menu(node) {
    for (const bar of node.children) {
      let title;
      switch (bar.title) {
        case 'Locks':
          title = '我的锁';
          break;
        case 'Keyholder':
          title = '管理员';
          break;
        case 'Explore':
          title = '探索';
          break;
        case 'Activity':
          title = '活动';
          break;
        case 'Messages':
          title = '私信';
          break;
      }
      if (title) {
        bar.title = title;
        bar.querySelector('.name').innerText = title;
      }
    }
  }

  function translate_header(node) {
    const h2 = node.querySelector('h2');
    h2.innerText = h2.innerText
      .replace('My Locks', '我的锁')
      .replace('Shared Locks', '分享锁')
      .replace('Create a self-lock', '创建自锁');

    const t = node.lastElementChild.firstElementChild.children;
    if (t[0]) t[0].innerText = t[0].innerText.replace('Locks', '我的锁');
    if (t[1]) t[1].innerText = t[1].innerText.replace('Shared Locks', '分享锁');
  }

  function translate_no_locks(node) {
    node.firstElementChild.innerText = '你还没有创建任何锁。\n从现在开始吧！';
    node.querySelector('a').innerText = '创建锁';
    node.nextElementSibling.firstChild.textContent = '或 ';
    node.nextElementSibling.lastChild.innerText = '探索社区锁';

    const archived_locks = node.parentElement
      .parentElement
      .parentElement
      .nextElementSibling
      .querySelector('.caption');
    archived_locks.innerText = archived_locks.innerText.replace('View archived locks', '查看已归档的锁');
  }

  function translate_muibox(node) {
    const caption = node.querySelector('.caption');
    if (caption) {
      caption.childNodes.forEach((child) => {
        child.textContent = child.textContent
          .replace('You are creating a lock for yourself.', '你正在给自己创建锁。')
          .replace('Want to create a lock for other people?', '想给他人创建锁？')
          .replace('Create a shared lock', '创建分享锁');
      });

      const form = node.querySelector('form');
      form.querySelectorAll('h4').forEach((h4) => {
        h4.lastChild.textContent = h4.lastChild.textContent
          .replace('Initial duration', '初始时长')
          .replace('Options', '选项')
          .replace('Safety & control', '安全 & 控制')
          .replace('Features', '功能')
          .replace('Extensions', '插件');

        const caption = h4.nextElementSibling;
        caption.innerText = caption.innerText
          .replace('A random time will be chosen between minimum and maximum time.', '初始时长将在最小时长到最大时长之间随机选择。')
          .replace('Configure your lock', '配置你的锁')
          .replace('Decide the terms for your session: what you keep control of once locked.', '决定您上锁后能控制哪些内容。')
          .replace('Community features', '社区功能')
          .replace('Infinite customizations', '无限定制');

        const card = caption.nextElementSibling;
        if (card) {
          if (card.classList.contains('card-content')) {
            translate_card(card);
          } else if (card.classList.contains('list-group')) {
            translate_list_group(card);
          }
          if (card.firstElementChild?.firstElementChild) {
            const children = card.firstElementChild.children;
            for (const c of children) {
              translate_feature_card(c);
            }
          }
        }

        const btn = caption.parentElement?.nextElementSibling?.querySelector('button');
        if (btn) {
          forTextNode(btn, (c) => {
            c.textContent = c.textContent
              .replace('Add extensions', '添加插件');
          })
        }

        const alert_root = caption.parentElement?.parentElement?.nextElementSibling;
        if (alert_root) {
          const t = alert_root.querySelector('.MuiTypography-root');
          t.childNodes.forEach((c) => {
            if (c.nodeType === Node.TEXT_NODE) {
              c.textContent = c.textContent
                .replace("You're using", '你已使用了')
                .replace('available extensions.', '个插件。')
                .replace('get unlimited.', '无限制');
            } else if (c.nodeType === Node.ELEMENT_NODE) {
              c.innerText = c.innerText
                .replace('members', '用户');
            }
          });

          const t1 = alert_root.nextElementSibling;
          if (t1) {
            t1.querySelectorAll('.card-content').forEach((card) => {
              translate_feature_card(card);
            });

            forTextNode(t1.nextElementSibling.querySelector('button'), (c) => {
              c.textContent = c.textContent.
                replace('Add more extensions…', '添加更多插件…');
            });
          }
        }
      });

      const alert_root = form.querySelector('.MuiAlert-root');
      alert_root.querySelectorAll('p')
        .forEach((p) => {
          p.innerText = p.innerText
            .replace('You have an unsaved draft. Would you like to restore it?', '您有一个未保存的草稿。您想恢复它吗？')
            .replace('Uploaded images will need to be re-added.', '已上传的图片需要重新上传。');
        });
      alert_root.querySelectorAll('button')
        .forEach((btn) => {
          btn.innerText = btn.innerText
            .replace('Restore draft', '恢复草稿')
            .replace('Discard', '丢弃');
        });

      const submit = form.querySelector('button[type="submit"]');
      submit.innerText = submit.innerText
        .replace('Continue', '继续');
    } else {
      const title = node.querySelector('.MuiTypography-title-md');
      if (title) translate_permissions(node);
    }
  }

  function translate_permissions(node) {
    const title = node.querySelector('.MuiTypography-title-md');
    title.innerText = title.innerText.replace('Permissions', '权限');

    node.querySelectorAll('.MuiChip-label').forEach((label) => {
      label.innerText = label.innerText
        .replace('Standard', '标准')
        .replace('Trusted keyholder', '信任管理员')
        .replace('Full trust', '完全信任')
        .replace('Custom', '自定义')
        .replace('Modified from Standard', '修改自标准权限');
    });

    const body = node.querySelector('.MuiTypography-body-sm');
    if (body) body.innerText = body.innerText
      .replace('The keyholder runs the session with the usual controls.', '管理员控制锁的方式');
  }

  function translate_DurationSelector(node) {
    node.querySelectorAll('.duration-label').forEach((label) => {
      label.innerText = label.innerText
        .replace('days', '天')
        .replace('day', '天')
        .replace('hours', '时')
        .replace('hour', '时')
        .replace('minutes', '分')
        .replace('minute', '分');
    });
  }

  function translate_card(node) {
     node.querySelectorAll('h5').forEach((h5) => {
      h5.innerText = h5.innerText
        .replace('Minimum duration', '最小时长')
        .replace('Maximum duration', '最大时长');

      const c = h5.nextElementSibling;
      c.innerText = c.innerText
        .replace('The starting minimum duration', '起始最短时长')
        .replace('The initial duration will not exceed this time', '初始时长不会超过此时间');

      translate_DurationSelector(c.nextElementSibling);
    });
  }

  function translate_list_group(node) {
    node.querySelectorAll('.checkbox-label-title').forEach((label) => {
      forTextNode(label, (c) => {
        c.textContent = c.textContent
          .replace('Display remaining time', '显示剩余时间')
          .replace('Display time information from history', '显示历史记录中的时间信息')
          .replace('Set a minimum lock time', '设置最小锁定时长')
          .replace('Limit lock time', '限制锁定时长')
          .replace('Offer your session', '启用管理员')
          .replace('Test lock', '测试锁');
      });
      label.nextElementSibling.innerText = label.nextElementSibling.innerText
        .replace('The remaining time will be displayed.', '剩余时间将会显示。')
        .replace('Time changes will be displayed in the lock history.', '时间改变信息将会显示在锁的历史记录中。')
        .replace('The lock cannot be unlocked before the minimum time.', '在最小时长结束之前锁将无法解锁。')
        .replace('The lock cannot exceed the maximum time.', '锁定时间不会超过最大时长。')
        .replace('Ask another user to control your lock.', '让他人来管理你的锁。')
        .replace('Test locks do not count in your stats.', '测试锁不会计入你的统计数据。');
    });
  }

  function translate_feature_card(node) {
    node.querySelectorAll('.caption').forEach((caption) => {
      if (caption.children.length === 0) {
        caption.innerText = caption.innerText
          .replace('Share your lock with others', '分享给其他人投票')
          .replace('Temporarily unlock yourself', '自我清洁解锁')
          .replace('Be displayed publicly when you receive a penalty', '受到惩罚时公开')
          .replace('Roll the dice and try to reduce your time locked', '掷骰子来尝试减少你的锁定时间')
          .replace('Try your luck by spinning the Wheel of Fortune', '转动幸运转盘来试试你的运气')
          .replace('Receive tasks and earn points to be unlocked', '接受任务并赚取积分才能解锁你的锁')
          .replace('Regularly take a picture of your device or restraint to show that you are locked', '周期性地拍照来证明你已戴锁')
          .replace('With the timer hidden, guess when you think the timer is finished', '隐藏计时器，猜猜何时结束')
          .replace('Add randomness to your lock', '给你的锁带来随机性')
          .replace('Receive penalties when you do not perform actions on time', '未按时执行操作将受到处罚');
      } else {
        const t = caption.firstChild.firstChild;
        t.textContent = t.textContent
          .replace('Share links', '分享链接')
          .replace('Hygiene opening', '清洁开锁')
          .replace('Pillory', '公开羞辱')
          .replace('Dice', '骰子')
          .replace('Wheel of Fortune', '幸运转盘')
          .replace('Tasks', '任务')
          .replace('Verification picture', '拍照验证')
          .replace('Guess the Timer', '猜时间')
          .replace('Random Events', '随机事件')
          .replace('Penalties', '惩罚');
      }
    });
  }

  function translate_modal(node) {
    const h2 = node.querySelector('h2');
    h2.innerText = h2.innerText
      .replace('Permissions', '权限');

    node.querySelectorAll('p').forEach(p => {
      p.innerText = p.innerText
        .replace('Choose what each party can do during the session. The other party accepts these terms by joining.', '选择佩戴者和管理员可以进行的操作。佩戴者或管理员加入即代表同意此条款。')
        .replace('Start from a preset', '使用预设')
        .replace('Standard', '标准')
        .replace('The keyholder runs the session with the usual controls; extensions stay as configured.', '管理员可对锁进行常规控制；无法修改插件配置。')
        .replace('Trusted keyholder', '信任管理员')
        .replace('The keyholder controls everything about the session, including extensions.', '管理员可以控制一切，包括插件配置。')
        .replace('Full trust', '完全信任')
        .replace('Wearer and keyholder can both change anything at any time.', '佩戴者和管理员都可以修改一切。')
        .replace('Custom', '自定义')
        .replace('Wearer', '佩戴者')
        .replace('Keyholder', '管理员')
        .replace('Time', '时间')
        .replace('Add time', '增加时间')
        .replace('Remove time', '减少时间')
        .replace('Freeze the timer', '冻结计时器')
        .replace('Unfreeze the timer', '解冻计时器')
        .replace('Limits', '上下限')
        .replace('Change the minimum date', '修改最小时长')
        .replace('Change the maximum date', '修改最大时长')
        .replace('Visibility', '可见性')
        .replace('Show or hide the timer', '显示/隐藏时间')
        .replace('Show or hide time values in history', '显示/隐藏历史记录中的时间信息')
        .replace('Extensions', '插件')
        .replace('Manage extensions', '管理插件');
    });

    const alert_text = node.querySelector('.MuiAlert-root')?.lastChild;
    if (alert_text) {
      alert_text.textContent = alert_text.textContent
        .replace('The Keyholder column applies only once a keyholder holds this lock.', '"管理员"列权限只在管理员持有此锁时生效。');
    }

    node.querySelectorAll('button').forEach((btn) => {
      btn.innerText = btn.innerText
        .replace('Cancel', '取消')
        .replace('Save', '保存');
      btn.style.flexShrink = '0';
    });
  }

  function translate_tooltip(node) {
    node.innerText = node.innerText
      .replace('Share a link to other people to ask them to add or remove time to your lock.', '分享链接给其他人，让他们帮你增加或减少锁的时间。')
      .replace('Because hygiene is important, unlock yourself regularly to clean your chastity device. Be careful, if you exceed the allowed time, you will receive a penalty.', '因为卫生很重要，请定期解锁并清洁贞操锁。注意，如果你超时了还没锁回去，你将受到惩罚。')
      .replace('When you receive a penalty, be displayed publicly for a specified period of time. Other users will be able to add time to your lock.', '当受到惩罚时，你的锁将被公开显示一段时间。其他人可以给你的锁增加时间。');
  }

  function translate_extension_modal(node) {
    const title = node.querySelector('.modal-title');
    forTextNode(title, (c) => {
      c.textContent = c.textContent
        .replace('Configure', '配置')
        .replace('Share links', '分享链接')
        .replace('Hygiene opening', '清洁开锁')
        .replace('Pillory', '公开羞辱')
        .replace('Share links', '分享链接')
        .replace('Hygiene opening', '清洁开锁')
        .replace('Pillory', '公开羞辱')
        .replace('Dice', '骰子')
        .replace('Wheel of Fortune', '幸运转盘')
        .replace('Tasks', '任务')
        .replace('Verification picture', '拍照验证')
        .replace('Guess the Timer', '猜时间')
        .replace('Random Events', '随机事件')
        .replace('Penalties', '惩罚');;
    });

    const caption = node.querySelector('.modal-body .caption');
    caption.innerText = caption.innerText
      .replace('Share a link to other people to ask them to add or remove time to your lock.', '分享链接给其他人，让他们帮你增加或减少锁的时间。')
      .replace('Because hygiene is important, unlock yourself regularly to clean your chastity device. Be careful, if you exceed the allowed time, you will receive a penalty.', '因为卫生很重要，请定期解锁并清洁贞操锁。注意，如果你超时了还没锁回去，你将受到惩罚。')
      .replace('When you receive a penalty, be displayed publicly for a specified period of time. Other users will be able to add time to your lock.', '当受到惩罚时，你的锁将被公开显示一段时间。其他人可以给你的锁增加时间。');

    node.querySelectorAll('.modal-footer button').forEach((btn) => {
      btn.innerText = btn.innerText
        .replace('Cancel', '取消')
        .replace('Save changes', '保存修改');
    });
  }

  const config = {
    childList: true,
    subtree: true,
    characterData: true,
  };
  let isHandling = false;
  const ob = new MutationObserver((mutationList, observer) => {
    mutationList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        switch (node.nodeType) {
          case Node.TEXT_NODE:
            node.textContent = node.textContent
              .replace('Enter the keyholder username', '输入管理员的用户名')
              .replace('Minimum lock duration', '最小锁定时长')
              .replace('The lock cannot be unlocked before this time has elapsed.', '在此时间结束前该锁无法解锁。')
              .replace('Customize the maximum time', '自定义最大时长')
              .replace('You will be able to release yourself after this time, regardless of the extensions.', '在此时间之后你无论如何都能够解锁。')
              .replace("You're using", '你正在使用')
              .replace('available extensions.', '个插件。')
              .replace('get unlimited', '无限制')
              .replace('Plus members', 'Plus 用户');
            break;
          case Node.ELEMENT_NODE:
            if (node.classList.contains('full-page-loader')) {
              translate_loading(node);
            }

            const h1 = node.querySelector('.Home h1');
            if (h1) {
              const c = h1.nextElementSibling;
              c.innerText = c
                .innerText
                .replace('The ultimate chastity experience', '终极贞操体验');
              const btn = c.nextElementSibling.querySelector('button');
              btn.firstChild.textContent = btn.firstChild.textContent
                .replace('Access the application', '开始使用');
            }

            const bottom_menu = node.querySelector('.BottomMenuBar');
            if (bottom_menu) translate_bottom_menu(bottom_menu);

            const header = node.querySelector('.MobileHeader');
            if (header) translate_header(header);

            const no_locks = node.querySelector('.no-locks-text');
            if (no_locks) translate_no_locks(no_locks);

            const muibox = node.querySelector('.MuiBox-root');
            if (muibox) translate_muibox(muibox);

            if (node.classList.contains('checkbox-list-group-footer')) {
              node.firstElementChild.innerText = node.firstElementChild.innerText
                .replace('Enter the keyholder username', '输入管理员的用户名');
              const c = node.querySelector('.caption');
              if (c) {
                c.innerText = c.innerText
                  .replace('You can also leave it blank and select a keyholder later, or send an invite link to someone.', '你也可以暂时留空，稍后再选择管理员或者通过给其他人发送邀请链接。');
              }
            }

            const chip_label = node.querySelector('.MuiChip-label');
            if (chip_label) {
              chip_label.innerText = chip_label.innerText
                .replace('Modified from Standard', '修改自标准权限');
            }

            const permissions = node.closest('.MuiStack-root');
            if (permissions && permissions.querySelector('.MuiTypography-title-md')) translate_permissions(permissions);

            if (node.classList.contains('MuiModal-root')) {
              translate_modal(node);
            } else if (node.classList.contains('MuiTooltip-root')) {
              translate_tooltip(node);
            } else if (node.classList.contains('ExtensionConfigModal')) {
              translate_extension_modal(node);
            }

            const btn = node.querySelector('.MuiButton-root');
            if (btn) {
              forTextNode(btn, (c) => {
                c.textContent = c.textContent
                  .replace('Configure', '配置');
              })
            }

            if (node.children.length === 0) {
              node.innerText = node.innerText
                .replace('You can also leave it blank and select a keyholder later, or send an invite link to someone.', '你也可以暂时留空，稍后再选择管理员或者通过给其他人发送邀请链接。');
            }
            break;
        }
        // console.log(node)
      });

      if (mutation.type === 'characterData') {
        observer.disconnect();
        isHandling = true;
        try {
          const target = mutation.target;
          if (target.nodeType === Node.TEXT_NODE) {
            target.textContent = target.textContent
              .replace('days', '天')
              .replace('day', '天')
              .replace('hours', '时')
              .replace('hour', '时')
              .replace('minutes', '分')
              .replace('minute', '分');
          }
        } finally {
          isHandling = false;
          observer.observe(document.body, config);
        }
      }
    });
  });
  ob.observe(document.body, config);
})();