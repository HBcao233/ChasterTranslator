// ==UserScript==
// @name               ChasterTranslator
// @name:zh-CN         Chaster 中文翻译
// @namespace          chaster_translator
// @version            0.6
// @description        Chaster Translator Simplified Chinese
// @description:zh-CN  Chaster 中文翻译
// @author             HBcao
// @match              https://*.chaster.app/*
// @icon               https://www.google.com/s2/favicons?sz=64&domain=chaster.app
// @grant              none
// @license            MIT
// ==/UserScript==

(function () {
  'use strict';

  function forTextNode(node, text_func, element_func) {
    if (!node) return;
    node.childNodes.forEach((c) => {
      if (c.nodeType === Node.TEXT_NODE) {
        text_func?.(c);
      } else if (c.nodeType === Node.ELEMENT_NODE) {
        element_func?.(c);
      }
    });
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
        case 'Home':
          title = '主页';
          break;
        case 'Account':
          title = '账号';
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
      .replace('Create a self-lock', '创建自锁')
      .replace('Create a shared lock', '创建分享锁');

    const t = node.lastElementChild.firstElementChild.children;
    if (t[0]) t[0].innerText = t[0].innerText.replace('Locks', '我的锁');
    if (t[1]) t[1].innerText = t[1].innerText.replace('Shared Locks', '分享锁');
  }

  function translate_no_locks(node) {
    node.firstElementChild.innerText = node.firstElementChild.innerText
      .replace("You don't have any locks. Start a session now!", '你还没有创建任何锁。\n从现在开始吧！');
    const a = node.querySelector('a');
    a.innerText = a.innerText.replace('Create a lock', '创建锁');
    forTextNode(node.nextElementSibling.firstChild, (c) => {
      c.textContent = c.textContent.replace('or ', '或 ');
    }, (c) => {
      c.innerText = c.innerText.replace('explore community locks', '探索社区锁');
    });
  }

  function translate_p(node) {
    node.querySelectorAll('h2').forEach((h2) => {
      forTextNode(h2, (c) => {
        c.textContent = c.textContent
          .replace('Combination picture', '密码照片')
          .replace('Steps', '步骤');
      });
    });
    node.querySelectorAll('.MuiTypography-root').forEach((p) => {
      forTextNode(p, (c) => {
        c.textContent = c.textContent
          .replace('Start a chastity lock', '开始贞操锁')
          .replace('Review your lock', '检查你的锁')
          .replace('Locking method', '上锁方式')
          .replace('Summary', '总览')
          .replace("Here's how your chastity session will run. Take a moment to review before you start.", '以下是你的贞操锁信息。在开始前上锁请花点时间仔细检查。')
          .replace('Initial', '初始时长')
          .replace('Minimum', '最小时长')
          .replace('Maximum', '最大时长')
          .replace('Timer', '计时器')
          .replace('None', '无')
          .replace('No maximum lock time', '没有最大锁定时间')
          .replace("Without a limit, your lock could run forever if misconfigured. Only skip this if you know what you're doing.", '没有设置限制，如果配置错误，你的锁可能会一直运行下去。只有在你清楚自己在做什么的情况下才跳过此步骤。')
          .replace('You can invite a keyholder anytime after the lock starts.', '你可以随时邀请他人成为你的锁管理员。')
          .replace("Test lock. Won't be saved to your stats.", '测试锁。不会记录进你的统计数据。')
          .replace('Test lock', '测试锁')
          .replace("This session won't affect your stats.", '测试锁不会记入你的统计数据。')
          .replace("Pick how you want to lock your chastity keys. You'll configure the details on the next step.", '选择你想怎么锁住贞操锁的钥匙，然后你将在下一步配置细节。')
          .replace('Lockbox', '普通锁盒')
          .replace('A physical key safe with a numeric combination.', '一种使用数字密码解锁的钥匙锁盒')
          .replace('Photograph the dials. You never see it.', '将密码拍照。你从未看过它。')
          .replace('Chaster picks a random code for you.', '由 Chaster 帮你选一个随机密码。')
          .replace('Smart lockbox', '智能锁盒')
          .replace('Connected devices that release the key automatically when your timer ends.', '绑定智能锁盒，在时间结束时通过蓝牙解锁。')
          .replace('Link your Chaster lock with a Reach Lock device.', '将你的 Chaster 锁与 Reach 锁盒连接。')
          .replace('The recommended method. You never see the combination; only Chaster does, until the session ends.', '推荐方法。你永远不会看到密码，只有 Chaster 才能看到，直到锁定结束。')
          .replace('How to do it', '如何操作')
          .replace('Open the lockbox and put the chastity key inside.', '打开锁盒并把贞操锁钥匙放进去。')
          .replace('Switch your lockbox to reset mode (usually a small switch or button on the back).', '将锁盒切换到重置模式（通常是背面的一个小开关或按钮）。')
          .replace('Look away. Scramble the dials with your eyes closed to set a new combination.', '别看。闭上眼睛，胡乱拨动拨盘，设置新的密码组合。')
          .replace('Switch back to normal mode to lock in the new combination.', '切换锁盒为正常模式以锁定新密码。')
          .replace('Without looking at the dials, take a clear photo of them.', '不要看表盘，拍一张清晰的照片。')
          .replace('Upload the photo here.', '上传图片。')
          .replace('Close the box, scramble the dials again, and delete the photo from your device.', '关上盒子，再次拨乱拨盘，然后从设备中删除照片。')
          .replace('Image verification', '图片验证')
          .replace("If the photo is blurry, you may not be able to read the code at unlock. With Plus, a moderator checks your photo so you don't find out the hard way.", '如果照片模糊，您可能无法读取解锁时的密码。使用 Plus 服务，会有审核人员检查您的照片，避免您遇到麻烦。')
          .replace('A moderator confirms the photo is readable', '版主确认照片清晰可读')
          .replace('Catches blurry shots before unlock day', '在解锁日之前捕获模糊的照片')
          .replace('You still never see the code', '你依然看不到密码')
          .replace("Upload the photo of your combination. We'll show it back to you when the session ends.", '上传你的密码照片。锁定结束后我们会展示给你看。')
          .replace('Drop your combination image here or click to upload', '将图片拖动到此处或点击上传')
          .replace("We'll generate a combination for you to set on your lockbox.", '我们会为您生成一个密码组合，供您设置在锁盒上。')
          .replace("Here's everything that will happen when you start. Review once more, then lock in.", '以下是您开始后将要发生的一切。请再检查一遍，然后确认。')
          .replace('Generated code', '生成密码')
          .replace('Chaster will reveal the combination when the lock ends.', '当锁结束时，Chaster 会返还密码。')
          .replace('Combination picture', '密码照片')
          .replace('We\'ll show the photo back to you when the session ends.', '当锁结束时，Chaster 会返还照片。')
          .replace('hours', '小时')
          .replace('hour', '小时')
          .replace('days', '天')
          .replace('day', '天')
          .replace('minutes', '分')
          .replace('minute', '分')
          .replace('Visible', '可见')
          .replace('Hidden', '隐藏')
          .replace('Extensions', '插件')
          .replace('Lock duration', '上锁时长')
          .replace('All community members', '全社区成员')
          .replace('Anyone can see and validate your submissions', '任意用户都可以查看和验证你的任务提交')
          .replace('Only my keyholder', '仅限管理员')
          .replace('Only your keyholder can see your submissions', '只有我的管理员可以查看你的任务提交');
      }, (ch) => {
        forTextNode(ch, (c) => {
          c.textContent = c.textContent
            .replace('Combination picture', '拍照')
            .replace('Generated code', '生成密码')
            .replace('Reach Lock', 'Reach 锁盒');
        })
      });
    });

    node.querySelectorAll('button').forEach((btn) => {
      forTextNode(btn, (c) => {
        c.textContent = c.textContent
          .replace('How does this work?', '这是如何运作的？')
          .replace('Use Camera', '使用相机')
          .replace('Generate', '生成')
          .replace('Add extensions', '添加扩展')
          .replace('Edit permissions', '编辑权限')
          .replace('Save changes', '保存修改')
          .replace('Save the lock', '保存锁')
          .replace('Add an action', '增加一个格子')
          .replace('Shuffle actions', '打乱顺序')
          .replace('Add more extensions…', '添加更多扩展…')
          .replace('Access the application', '开始使用')
          .replace('Archive', '归档')
          .replace('or select a date range', '或者选择日期范围')
          .replace('or select a duration range', '或者选择时长范围')
          .replace('Restore draft', '恢复草稿')
          .replace('Discard', '丢弃')
          .replace('Add an action', '增加一项')
          .replace('All community members', '全社区成员')
          .replace('Only my keyholder', '仅限管理员')
          .replace('Add a task', '增加任务')
          .replace('or let the wearer configure the tasks', '或者让佩戴者自行配置任务')
          .replace('Configure the task list myself', '我自己配置任务列表')
          .replace('Save', '保存')
          .replace('Actions', '操作')
          .replace('Cancel', '取消')
          .replace('Hide', '隐藏')
          .replace('Continue', '继续')
          .replace('Configure', '配置');
      });
      if (btn.children.length === 0) {
        btn.style.flexShrink = '0'
      }
    });

    node.querySelectorAll('h5').forEach((h5) => {
      forTextNode(h5, (c) => {
        c.textContent = c.textContent
          .replace('Number of digits in combination', '密码位数')
          .replace('Generated code', '生成的密码');
      });
      forTextNode(h5.nextElementSibling, (c) => {
        c.textContent = c.textContent
          .replace('Here is the generated code to set on your lockbox.', '请把该密码设置在你的锁盒上。');
      })
    });

    node.querySelectorAll('.MuiChip-label').forEach((span) => {
      forTextNode(span, (c) => {
        c.textContent = c.textContent
          .replace('Share links', '分享链接')
          .replace('Hygiene opening', '清洁开锁')
          .replace('Pillory', '公开羞辱')
          .replace('Dice', '骰子')
          .replace('Wheel of Fortune', '幸运转盘')
          .replace('Tasks', '任务')
          .replace('Verification picture', '拍照验证')
          .replace('Guess the Timer', '猜时间')
          .replace('Random Events', '随机事件')
          .replace('Penalties', '惩罚')
          .replace('Min', '最短')
          .replace('Max', '最长')
          .replace('Timer visible', '计时器可见')
          .replace('Timer hidden', '计时器隐藏')
          .replace('hours', '小时')
          .replace('hour', '小时')
          .replace('days', '天')
          .replace('day', '天')
          .replace('minutes', '分')
          .replace('minute', '分');
      })
    });

    node.querySelectorAll('.MuiFormLabel-root').forEach((label) => {
      forTextNode(label, (c) => {
        c.textContent = c.textContent
          .replace('Who can validate submissions', '谁可以验证任务提交')
          .replace('Voting duration', '投票时长')
          .replace('Number of votes', '投票数量')
          .replace('Require a verification picture', '需要照片核验')
          .replace('Enable timed task', '启用限时任务')
          .replace('Duration', '时长')
          .replace('Require a verification code', '需要验证码')
          .replace('Points', '点数');
      });
    });

    node.querySelectorAll('.caption').forEach((caption) => {
      forTextNode(caption, (c) => {
        c.textContent = c.textContent
          .replace('Loading...', '加载中...')
          .replace('Loading settings...', '加载设置...')
          .replace('Loading profile...', '加载头像...')
          .replace('View archived locks', '查看已归档的锁')
          .replace('You are creating a lock for yourself.', '你正在给自己创建锁。')
          .replace('Want to create a lock for other people?', '想给他人创建锁？')
          .replace("You’re going to create a lock to share with other people. Want to ", '你正在创建一个分享锁。想要')
          .replace('You will find your lock in the list of archived locks.', '归档后你可以在已归档锁列表找到它。')
          .replace('You can also leave it blank and select a keyholder later, or send an invite link to someone.', '你也可以暂时留空，稍后再选择管理员或者通过给其他人发送邀请链接。')
          .replace('You will be able to release yourself after this time, regardless of the extensions.', '在此时间之后你无论如何都能够解锁')
          .replace('Share your lock with others', '分享给其他人投票')
          .replace('Temporarily unlock yourself', '自我清洁解锁')
          .replace('Be displayed publicly when you receive a penalty', '受到惩罚时公开')
          .replace('Roll the dice and try to reduce your time locked', '掷骰子来尝试减少你的锁定时间')
          .replace('Try your luck by spinning the Wheel of Fortune', '转动幸运转盘来试试你的运气')
          .replace('Receive tasks and earn points to be unlocked', '接受任务并赚取积分才能解锁你的锁')
          .replace('Regularly take a picture of your device or restraint to show that you are locked', '周期性地拍照来证明你已戴锁')
          .replace('With the timer hidden, guess when you think the timer is finished', '隐藏计时器，猜猜何时结束')
          .replace('Add randomness to your lock', '给你的锁带来随机性')
          .replace('Receive penalties when you do not perform actions on time', '未按时执行操作将受到惩罚')
          .replace('Share a link to other people to ask them to add or remove time to your lock.', '分享链接给其他人，让他们帮你增加或减少锁的时间。')
          .replace('Because hygiene is important, unlock yourself regularly to clean your chastity device. Be careful, if you exceed the allowed time, you will receive a penalty.', '因为卫生很重要，请定期解锁并清洁贞操锁。注意，如果你超时了还没锁回去，你将受到惩罚。')
          .replace('When you receive a penalty, be displayed publicly for a specified period of time. Other users will be able to add time to your lock.', '当受到惩罚时，你的锁将被公开显示一段时间。其他人可以给你的锁增加时间。')
          .replace('With every action, you and the bot roll a dice. If you do more than the bot, time is removed. If the bot does more, time is added.', '和机器人一起玩投骰子。如果你的点数更大，则减少时间；如果机器人的点数更大，则增加')
          .replace('Turn the wheel of fortune and change the duration of your lock. Configure actions for each cell of the wheel of fortune: time added or removed, frozen timer or custom text for your dares.', '转动幸运转盘以改变你的锁定时间。你可以配置转盘每个格子选项：增加或减少时间、冻结时间或自定义挑战文本。')
          .replace('Spice up your session by receiving tasks. Configure the tasks you want to do, and receive a random task, or ask other users to vote.', '通过接取任务来丰富你的戴锁体验。')
          .replace('Time added if the visitor chooses to add you time.', '当别人选择给你加时时增加的时间量。')
          .replace('Time removed if the visitor chooses to remove you time.', '当别人选择给你减时时减少的时间量。')
          .replace('You will need to get a certain number of visitors before you can unlock your lock.', '当投票数量大于等于此数量你才能解锁。')
          .replace('Maximum time allowed to open your lock.', '允许开锁的时间。')
          .replace('If you do not lock up before the allowed time, this time is added to your lock.', '如果你超时还没锁回去，锁将会增加的时间。')
          .replace('Time added for each vote of a visitor', '访问者每投一票增加的时间')
          .replace('The wearer will need to get a certain number of visitors before they can unlock their lock.', '佩戴者需要获得此数量的投票才能解锁。')
          .replace('Select the extension mode', '选择扩展模式')
          .replace('Choose the number of sides on the dice.', '选择骰子的面数。')
          .replace('Configure your wheel of fortune', '配置你的幸运转盘')
          .replace('The difference between the two dice will be multiplied by this time.', '两个骰子点数之差乘以此时间。')
          .replace('Select the extension mode', '选择扩展模式')
          .replace('Spice up your session by receiving tasks. Configure the tasks you want to do, and receive a random task, or ask other users to vote.', '通过接取任务来丰富你的戴锁体验。')
          .replace('By configuring points, you can assign points to each task. Earn more points, and set a goal of points required to get unlocked.', '启用任务点，你可以为每个任务设置点数。赚取更多任务点，并设置解锁所需的点数。')
          .replace('Require a photo as proof of task completion. On selected tasks, you must upload a picture demonstrating that you have successfully finished the task.', '需要提供照片作为任务完成证明。你可以让选中的任务，要求上传一张照片，以证明你已成功完成该任务。')
          .replace('Configure the tasks you would like to do during your session.', '配置您希望在上锁期间执行的任务。')
          .replace('Allow task editing.', '配置任务编辑。')
          .replace('Allow wearers to assign and modify tasks.', '配置佩戴者分配和修改任务。')
          .replace('You will need to get a certain amount of points before you can unlock your lock.', '你需要至少获得此数量的任务点才能解锁。')
          .replace('Penalty when your verification is rejected', '当你的任务提交被拒绝时将受到的惩罚')
          .replace('Penalty when the verification is rejected', '当任务提交被拒绝时将受到的惩罚')
          .replace('Penalty when a task is abandoned', '当放弃任务时将受到的惩罚')
          .replace('Require a photo as proof of task completion. On selected tasks, wearers must upload a picture demonstrating that they have successfully finished the task.', '需要提供照片作为任务完成证明。你可以让选中的任务，要求上传一张照片，以证明佩戴者已成功完成该任务。');
      }, (ch) => {
        if (ch.nodeName === 'UL') {
          ch.childNodes.forEach((li) => {
            li.innerText = li.innerText
              .replace('Wheel of Fortune extension: you fall on the pillory cell', '幸运转盘扩展：落在公开羞辱格子')
              .replace('Keyholder: your keyholder put you in the pillory', '管理员：你的管理员手动开启公开羞辱')
              .replace('Punishments extension: you receive a penalty', '惩罚扩展：当你受到惩罚时')
              .replace('Peer verifications: your verification picture is rejected', '拍照验证扩展：你的验证被否决');
          });
        } else {
          forTextNode(ch, (c) => {
            c.textContent = c.textContent
              .replace('Create a shared lock', '创建分享锁')
              .replace('create a lock for yourself', '创建自锁')
              .replace('After unlocking yourself, you will have to wait this duration before you can unlock yourself again.', '解锁后你需要等待此时间后才能再次解锁。')
              .replace('You can be pilloried for the following reasons:', '你会因为以下原因而被公开羞辱：')
              .replace('Note: you cannot pillory yourself.', '注意：你不能自己开启公开羞辱。')
              .replace('After using the extension, you will have to wait this duration before using it again.', '使用该扩展后，你需要等待此时间后才能再次使用。')
              .replace('After using the extension, you will have to wait this duration before getting another try.', '使用该扩展后，你需要等待此时间后才能再次尝试。');
          });
        }
      });

      const previous = caption.previousElementSibling;
      if (previous) {
        forTextNode(previous, (c) => {
          c.textContent = c.textContent
            .replace('Archive your lock', '归档该锁')
            .replace('Task points', '任务点')
            .replace('Task verification', '任务核验')
            .replace('Tasks', '任务')
            .replace('Assign and edit votes', '任务分配与编辑')
            .replace('Time to add', '增加的时间')
            .replace('Time to remove', '减少的时间')
            .replace('Regularity', '周期')
            .replace('Time allowed', '允许时间')
            .replace('Penalty for time exceeded', '超时惩罚')
            .replace('Time added per vote', '每票增加的时间')
            .replace('How can I be pilloried?', '什么时候我会被公开羞辱？')
            .replace('Mode', '模式')
            .replace('Dice type', '骰子类型')
            .replace('Time multiplier', '时间倍率')
            .replace('Actions', '转盘格子');
        });

        const title = caption.previousElementSibling.children[1]?.firstElementChild?.firstElementChild;
        if (title) forTextNode(title, (c) => {
          c.textContent = c.textContent
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
        });
      }
    });

    node.querySelectorAll('.MuiFormHelperText-root').forEach((helper) => {
      forTextNode(helper, (c) => {
        c.textContent = c.textContent
          .replace('Voting closes as soon as this many votes are cast. Between 3 and 100 votes.', '当投票达到这个数量时就会立即关闭。填写范围：3～100')
          .replace('Require a minimum time before the task can be marked complete.', '要求任务必须在一定时间内完成。');
      })
    });

    node.querySelectorAll('.MuiMenuItem-root').forEach((a) => {
      forTextNode(a, (c) => {
        c.textContent = c.textContent
          .replace('View the lock page', '查看锁介绍页')
          .replace('Create a lock from this template', '以此为模板创建锁');
      })
    });

    node.querySelectorAll('.form-label').forEach((label) => {
      forTextNode(label, (c) => {
        c.textContent = c.textContent
          .replace('Copy and share this link to invite other users to use your shared lock.', '复制并分享此链接来邀请其他人来使用你的共享锁。');
      });

      const f = label.nextElementSibling.nextElementSibling;
      if (f) {
        forTextNode(f, (c) => {
          c.textContent = c.textContent
            .replace('You can also', '你也可以')
            .replace('to share on social networks.', '分享到社交媒体');
        }, (ch) => {
          forTextNode(ch, (c) => {
            c.textContent = c.textContent
              .replace('create an image', '创建图片');
          });
        });
      }
    });
  }

  function translate_form(form) {
    form.querySelectorAll('h4').forEach((h4) => {
      translate_form_h4(h4)
    });

    const alert_root = form.querySelector('.MuiAlert-root');
    if (alert_root) {
      alert_root.querySelectorAll('p')
        .forEach((p) => {
          p.innerText = p.innerText
            .replace('You have an unsaved draft. Would you like to restore it?', '您有一个未保存的草稿。您想恢复它吗？')
            .replace('Uploaded images will need to be re-added.', '已上传的图片需要重新上传。');
        });
    }
  }

  function translate_form_h4(h4) {
    forTextNode(h4, (c) => {
      c.textContent = c.textContent
        .replace('Initial duration', '初始时长')
        .replace('Options', '选项')
        .replace('Safety & control', '安全 & 控制')
        .replace('Features', '功能')
        .replace('Extensions', '扩展')
        .replace('General', '常规')
        .replace('Actions', '操作');
    });

    const caption = h4.nextElementSibling;
    caption.innerText = caption.innerText
      .replace('A random time will be chosen between minimum and maximum time.', '初始时长将在最小时长到最大时长之间随机选择。')
      .replace('Configure your lock', '配置你的锁')
      .replace('Decide the terms for your session: what you keep control of once locked.', '决定您上锁后能控制哪些内容。')
      .replace('Decide the terms for the session: who holds which controls, and who can join.', '决定此分享锁的条款：谁可以管理，谁可以上锁。')
      .replace('Community features', '社区功能')
      .replace('Infinite customizations', '无限定制')
      .replace('Describe your lock', '解锁一下这个锁')
      .replace('Edit your shared lock', '编辑你的分享锁');

    const card = caption.nextElementSibling;
    if (card) {
      if (card.classList.contains('card-content')) {
        translate_card(card);
      } else if (card.classList.contains('list-group')) {
        translate_list_group(card);
      }

      const c = card.querySelector('.MuiCard-root');
      if (c) {
        translate_permissions(c);
        translate_list_group(card.nextElementSibling);
      }
    }

    const alert_root = caption.parentElement?.parentElement?.nextElementSibling;
    if (alert_root) {
      const t = alert_root.querySelector('.MuiTypography-root');
      forTextNode(t, (c) => {
        c.textContent = c.textContent
          .replace("You're using", '你已使用了')
          .replace('available extensions.', '个扩展。')
          .replace('available extension.', '个扩展。')
          .replace('get unlimited.', '无限制');
      }, (ch) => {
        forTextNode(ch, (c) => {
          c.textContent = c.textContent
            .replace('members', '用户');
        });
      });
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

    const body = node.querySelector('.MuiTypography-root');
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

    node.querySelectorAll('label').forEach((label) => {
      label.innerText = label.innerText
        .replace('Lock name', '名称')
        .replace('Lock description', '简介')
        .replace('Tags', '标签')
        .replace('Visibility', '可见性');
    });

    const lock_photo = node.querySelector('.lock-photo');
    if (lock_photo) {
      lock_photo.previousElementSibling.innerText = lock_photo
        .previousElementSibling
        .innerText
        .replace('This picture will appear on the lock page.', '该图片将会在锁的介绍页中展示');
      const t = lock_photo.previousElementSibling.previousElementSibling;
      t.innerText = t.innerText.replace('Lock photo', '封面');
    }
  }

  function translate_list_group(node) {
    node.querySelectorAll('.checkbox-label-title').forEach((label) => {
      forTextNode(label, (c) => {
        c.textContent = c.textContent
          .replace('Display remaining time', '显示剩余时间')
          .replace('Display time information from history', '显示历史记录中的时间信息')
          .replace('Set a minimum lock time', '设置最小锁定时长')
          .replace('Limit lock time', '限制锁定的最大时长')
          .replace('Offer your session', '启用管理员')
          .replace('Test lock', '测试锁')
          .replace('Limit the number of locked users', '限制锁定用户数量')
          .replace('This is a Findom lock', '这是一个上贡锁')
          .replace('The user must contact me before loading the lock', '用户必须联系我才能使用该分享锁')
          .replace('Set a password', '设置密码');
      });
      label.nextElementSibling.innerText = label.nextElementSibling.innerText
        .replace('The remaining time will be displayed.', '剩余时间将会显示。')
        .replace('Time changes will be displayed in the lock history.', '时间改变信息将会显示在锁的历史记录中。')
        .replace('The lock cannot be unlocked before the minimum time.', '在最小时长结束之前锁将无法解锁。')
        .replace('The lock cannot exceed the maximum time.', '锁定时间不会超过最大时长。')
        .replace('Ask another user to control your lock.', '让他人来管理你的锁。')
        .replace('Test locks do not count in your stats.', '测试锁不会计入你的统计数据。')
        .replace('Limit the number of users locked at the same time.', '限制同一时间锁定用户的数量')
        .replace('Only verified Findoms can create Findom locks. Requesting any form of payment without verification is strictly prohibited and may result in account suspension.', '只有经过认证的 Findoms 才能创建上贡锁。未经验证而索要任何形式的付款均被严格禁止，并可能导致账户被封禁。')
        .replace('This is purely indicative and requests the user to contact you before joining the lock.', '该分享锁仅供参考，用户需要联系你才能使用。')
        .replace('The user must enter this password to join the lock.', '用户需要输入密码才能使用该分享锁。');
    });
  }

  function translate_modal(node) {
    const h2 = node.querySelector('h2');
    forTextNode(h2, (c) => {
      c.textContent = c.textContent
        .replace('Permissions', '权限')
        .replace('Configure Tasks', '配置任务');
    });

    node.querySelectorAll('p').forEach(p => {
      forTextNode(p, (c) => {
        c.textContent = c.textContent
          .replace('Choose what each party can do during the session. The other party accepts these terms by joining.', '选择佩戴者和管理员可以进行的操作。佩戴者或管理员加入即代表同意此条款。')
          .replace('Start from a preset', '使用预设')
          .replace('Standard', '标准')
          .replace('The keyholder runs the session with the usual controls; extensions stay as configured.', '管理员可对锁进行常规控制；无法修改扩展配置。')
          .replace('Trusted keyholder', '信任管理员')
          .replace('The keyholder controls everything about the session, including extensions.', '管理员可以控制一切，包括扩展配置。')
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
          .replace('Extensions', '扩展')
          .replace('Manage extensions', '管理扩展');
      });
    });

    const alert_text = node.querySelector('.MuiAlert-root')?.lastChild;
    if (alert_text) {
      alert_text.textContent = alert_text.textContent
        .replace('The Keyholder column applies only once a keyholder holds this lock.', '"管理员"列权限只在管理员持有此锁时生效。');
    }

    const modes = node.querySelector('.modes');
    if (modes) {
      translate_modes(modes)
    }
  }

  function translate_tooltip(node) {
    node.innerText = node.innerText
      .replace('Share a link to other people to ask them to add or remove time to your lock.', '分享链接给其他人，让他们帮你增加或减少锁的时间。')
      .replace('Because hygiene is important, unlock yourself regularly to clean your chastity device. Be careful, if you exceed the allowed time, you will receive a penalty.', '因为卫生很重要，请定期解锁并清洁贞操锁。注意，如果你超时了还没锁回去，你将受到惩罚。')
      .replace('When you receive a penalty, be displayed publicly for a specified period of time. Other users will be able to add time to your lock.', '当受到惩罚时，你的锁将被公开显示一段时间。其他人可以给你的锁增加时间。')
      .replace('With every action, you and the bot roll a dice. If you do more than the bot, time is removed. If the bot does more, time is added.', '和机器人一起玩投骰子。如果你的点数更大，则减少时间；如果机器人的点数更大，则增加')
      .replace('Turn the wheel of fortune and change the duration of your lock. Configure actions for each cell of the wheel of fortune: time added or removed, frozen timer or custom text for your dares.', '转动幸运转盘以改变你的锁定时间。你可以配置转盘每个格子选项：增加或减少时间、冻结时间或自定义挑战文本。')
      .replace('Spice up your session by receiving tasks. Configure the tasks you want to do, and receive a random task, or ask other users to vote.', '通过接取任务来丰富你的戴锁体验。')
      .replace('Only verified Findoms can create Findom locks. Requesting payments without verification is strictly prohibited.', '只有经过认证的 Findoms 才能创建上贡锁。未经验证而索要任何付款均被严格禁止。')
      .replace('You will not be able to open the lock yourself, only the keyholder can open it. Note: by enabling this option, the regularity will not apply.', '你将不能自己开锁，而是由管理员来开锁。注意：启用后周期将不生效。')
      .replace('The lock timer will be frozen during the temporary opening. If the lock is already frozen by someone else, the extension will not interfere with that freeze.', '在清洁开锁期间计时器将被冻结。如果原先已经被冻结，则此扩展不会影响冻结状态')
      .replace('The wearer must have submitted a verification picture in the last 15 minutes before they can temporarily open the lock.', '佩戴者必须在清洁开锁开始前的15分钟内进行拍照验证。')
      .replace('A verification picture request will be automatically triggered after the lock is resumed.', '清洁开锁完成后需要进行拍照验证。')
      .replace('Only available to verified Findoms.', '只对经过认证的 Findoms 才可用。')
      .replace('Your lock will start with a random duration picked from this range.', '你的锁将会在此范围内选取随机开始时间。')
      .replace('The lock cannot end before this duration.', '该锁在此时间之前无法解锁')
      .replace('The lock cannot be extended beyond this duration.', '该锁的锁定时间不会超过此期限。')
      .replace('Whether the countdown timer is visible to you during the lock.', '该锁的倒计时是否可见。')
      .replace('Our team will check your image and confirm that the combination is clearly readable.', '我们团队将会检查你的照片，确保上面的数字清晰可读。')
      .replace('After each action, you will have to wait a certain amount of time before reusing the extension.', '每次使用后，你需要等待一段时间才能再次使用该扩展。')
      .replace('The number of possible actions of the extension is cumulated over time.', '扩展可使用次数会随时间累积。')
      .replace('You can use the extension as many times as you like.', '你可以根据需要多次使用该扩展。')
      .replace('Assign points to each task and set a point goal.', '为每个任务分配任务点并设定目标点数。')
      .replace('The selected validators will need to approve your image, otherwise you will receive a penalty.', '选定的验证者需要批准您的图片，否则您将受到惩罚。')
      .replace('You will be able to create, edit and remove tasks.', '启用后你将能够新增、修改或移除任务。')
      .replace('If the option is unchecked, only your keyholder can assign you a task.', '如果未启用该选项，只有你的管理员可以给你分配任务。')
      .replace('You will be able to choose your own task.', '启用后你将能够自己选择任务')
      .replace('You will receive a penalty if you abandon your task.', '启用后如果你放弃任务，将会受到惩罚。')
      .replace('Make sure you have a way to unfreeze yourself (keyholder, other extensions, etc.), otherwise you risk being frozen indefinitely!', '请确保您有办法解除冻结（例如管理员或其他扩展），否则您可能会被永久冻结！')
      .replace('Wearers will be able to create, edit and remove tasks.', '启用后佩戴者将能够新增、修改或移除任务。')
      .replace('If the option is unchecked, only you will be able to assign tasks to your wearers.', '如果未启用该选项，只有佩戴者的管理员可以给他分配任务。')
      .replace('Wearers will be able to choose their own task.', '启用后佩戴者将能够自己选择任务')
      .replace('Wearers will receive a penalty if they abandon their task.', '启用后如果佩戴者放弃任务，将会受到惩罚。');
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

    node.querySelectorAll('.modal-body label').forEach((label) => {
      forTextNode(label, (c) => {
        c.textContent = c.textContent
          .replace('Give the possibility to choose randomly', '增加随机选项')
          .replace('Number of visits required', '最少投票数量')
          .replace('Only allow logged-in people to vote', '只允许登录用户投票');
      })
    });

    node.querySelectorAll('.modal-body .MuiFormHelperText-root').forEach((text) => {
      forTextNode(text, (c) => {
        c.textContent = c.textContent
          .replace('The visitor will have the option to randomly select between adding and removing time.', '访问者可以选择随机增加/减少时间的选项。')
          .replace('If you enable this option, visitors will need to be logged in to add or remove time.', '启用后访问者必须登录才能进行投票。');
      })
    });

    const modes = node.querySelector('.modes');
    if (modes) {
      translate_modes(modes)
    }
  }

  function translate_modes(node) {
    node.querySelectorAll('.custom-control-label span').forEach((span) => {
      forTextNode(span, (c) => {
        c.textContent = c.textContent
          .replace('Non cumulative', '不累积')
          .replace('Cumulative', '累积')
          .replace('Unlimited', '无限制');
      })
    })
  }

  function translate_select(node) {
    node.childNodes.forEach((option) => {
      forTextNode(option, (c) => {
        c.textContent = c.textContent
          .replace('Add time', '增加时间')
          .replace('Remove time', '减少时间')
          .replace('Add or remove time', '增加/减少时间')
          .replace('Text', '文本')
          .replace('Freeze / unfreeze', '冻结 / 解冻')
          .replace('Freeze', '冻结')
          .replace('Unfreeze', '解冻')
          .replace('Pillory', '公开羞辱');
      })
    });
  }

  function translate_checkbox(checkbox) {
    forTextNode(checkbox, (c) => {
      c.textContent = c.textContent
        .replace('Request combination image verification', '请求人工检查照片')
        .replace('Allow only the keyholder to open the lock temporarily', '需要管理员同意才能清洁开锁')
        .replace('Freeze lock while temporarily opened', '清洁开锁时冻结时间')
        .replace('Require verification picture before opening', '清洁开锁前需要拍照验证')
        .replace('Request verification picture after opening', '清洁开锁后需要拍照验证')
        .replace('Enable task points', '启用任务点')
        .replace('Enable verification', '启用任务核验')
        .replace('Allow editing tasks while you are locked', '允许你上锁时编辑任务')
        .replace('Allow you to assign a task randomly or by creating a vote', '允许你随机选择任务或投票选择任务')
        .replace('Allow you to choose your own task from the list', '允许你自己选择任务')
        .replace('Give a penalty when a task is abandoned', '放弃任务应受到惩罚')
        .replace('End voting early once enough votes are in', '当投票足够时提前结束')
        .replace('Allow wearers to edit tasks while they are locked', '允许佩戴者上锁时编辑任务')
        .replace('Allow wearers to assign tasks to themselves', '允许佩戴者自行分配任务')
        .replace('Allow wearers to choose their own task from the list', '允许佩戴者自己选择任务');
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
        // console.log(node);

        switch (node.nodeType) {
          case Node.TEXT_NODE:
            node.textContent = node.textContent
              .replace('Enter the keyholder username', '输入管理员的用户名')
              .replace('Minimum lock duration', '最小锁定时长')
              .replace('The lock cannot be unlocked before this time has elapsed.', '在此时间结束前该锁无法解锁。')
              .replace('Customize the maximum time', '自定义最大时长')
              .replace('You will be able to release yourself after this time, regardless of the extensions.', '在此时间之后你无论如何都能够解锁。')
              .replace('The wearer will be able to release themselves after this time, regardless of the extensions.', '在此时间之后佩戴者无论如何都能够解锁。')
              .replace('get unlimited', '无限制')
              .replace('Plus members', 'Plus 用户')
              .replace('Maximum number of locked users', '最大锁定用户数量')
              .replace('All 3 slots used. Upgrade for unlimited extensions!', '所有 3 个扩展槽已用。升级以解锁无限扩展！')
              .replace('Review your lock', '检查你的锁')
              .replace('Locking method', '上锁方式')
              .replace('Summary', '总览');

            break;
          case Node.ELEMENT_NODE:
            // console.log('add element:', node.outerHTML);

            translate_p(node);

            const h1 = node.querySelector('.Home h1');
            if (h1) {
              const c = h1.nextElementSibling;
              c.innerText = c
                .innerText
                .replace('The ultimate chastity experience', '终极贞操体验');
            }

            const bottom_menu = node.querySelector('.BottomMenuBar');
            if (bottom_menu) {
              translate_bottom_menu(bottom_menu);
            }

            const header = node.querySelector('.MobileHeader');
            if (header) {
              translate_header(header);
            }

            const no_locks = node.querySelector('.no-locks-text');
            if (no_locks) {
              translate_no_locks(no_locks);
            }

            const form = node.querySelector('form');
            if (form) {
              translate_form(form);
            }
            const form1 = node.closest('form');
            if (form1) {
              node.querySelectorAll('h4').forEach((h4) => {
                translate_form_h4(h4)
              });
            }

            const chip_label = node.querySelector('.MuiChip-label');
            if (chip_label) {
              chip_label.innerText = chip_label.innerText
                .replace('Modified from Standard', '修改自标准权限');
            }

            const permissions = node.closest('.MuiCard-root');
            if (permissions && permissions.querySelector('.MuiTypography-title-md')) {
              translate_permissions(permissions);
            }

            if (node.classList.contains('checkbox-list-group-footer')) {
              forTextNode(node.firstElementChild, (c) => {
                c.textContent = c.textContent
                  .replace('Enter the keyholder username', '输入管理员的用户名');
              });

              node.querySelectorAll('label').forEach((label) => {
                forTextNode(label, (c) => {
                  c.textContent = c.textContent
                    .replace('Customize the maximum time', '自定义最大时长');
                })
              });
            } else if (node.classList.contains('MuiModal-root')) {
              translate_modal(node);
            } else if (node.classList.contains('MuiTooltip-root')) {
              translate_tooltip(node);
            } else if (node.classList.contains('ExtensionConfigModal')) {
              translate_extension_modal(node);
            } else if (node.classList.contains('MinMaxDurationSelector')) {
              translate_card(node)
            } else if (node.classList.contains('row')) {
              node.querySelectorAll('label').forEach((label) => {
                forTextNode(label, (c) => {
                  c.textContent = c.textContent
                    .replace('Minimum date', '最小日期')
                    .replace('Maximum date', '最大日期');
                });
              });
            }

            const extension_modal = node.closest('.ExtensionConfigModal');
            if (extension_modal) {
              translate_extension_modal(extension_modal);
            }

            node.querySelectorAll('select').forEach((select) => {
              translate_select(select);
            });

            node.querySelectorAll('.CheckboxGroupItem').forEach((checkbox) => {
              translate_checkbox(checkbox)
            })

            if (node.classList.contains('form-group')) {
              node.querySelectorAll('label').forEach((label) => {
                forTextNode(label, (c) => {
                  c.textContent = c.textContent
                    .replace('Points required', '点数要求')
                });
              });
            }

            forTextNode(node, (c) => {
              c.textContent = c.textContent
                .replace('You can also leave it blank and select a keyholder later, or send an invite link to someone.', '你也可以暂时留空，稍后再选择管理员或者通过给其他人发送邀请链接。')
                .replace('By enabling this option, you will need to have a keyholder to unlock yourself temporarily.', '启用后你必须有管理员才能清洁开锁。')
                .replace('You need to enable the Verification Picture extension for these options to have effect.', '你需要启用拍照验证扩展该选项才能生效。')
                .replace('After using the extension, you will have to wait this duration before using it again.', '使用该扩展后，你需要等待此时间后才能再次使用。')
                .replace('After using the extension, you will have to wait this duration before getting another try.', '使用该扩展后，你需要等待此时间后才能再次尝试。')
                .replace('Add at least two actions.', '至少要有两个格子。')
                .replace('Enter a task.', '请输入任务')
                .replace('By disabling this option, you will need to have a keyholder to receive tasks.', '禁用该选项后，只有你的管理员可以给你分配任务。');
            });

            break;
        }
      });

      if (mutation.type === 'characterData') {
        observer.disconnect();
        isHandling = true;
        try {
          const target = mutation.target;
          if (target.nodeType === Node.TEXT_NODE) {
            target.textContent = target.textContent
              .replace("You're using", '你已使用了')
              .replace('available extensions.', '个扩展。')
              .replace('available extension.', '个扩展。')
              .replace('days', '天')
              .replace('day', '天')
              .replace('hours', '时')
              .replace('hour', '时')
              .replace('minutes', '分')
              .replace('minute', '分')
              .replace('or select a date range', '或者选择日期范围')
              .replace('or select a duration range', '或者选择时长范围');
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